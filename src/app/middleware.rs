use std::pin::Pin;
use std::sync::LazyLock;
use axum::body::Body;
use axum::http::{header, Request, Response};
use tower_http::auth::{AsyncAuthorizeRequest, AsyncRequireAuthorizationLayer};
use crate::app::auth::{get_jwt, JWT};
use crate::app::error::ApiError;

static AUTH_LAYER: LazyLock<AsyncRequireAuthorizationLayer<JWTAuth>> = LazyLock::new(|| {
    AsyncRequireAuthorizationLayer::new(JWTAuth::new(get_jwt()))
});

#[derive(Clone)]
pub struct JWTAuth {
    jwt: &'static JWT
}

impl JWTAuth {
    pub fn new(jwt: &'static JWT) -> Self {
        Self { jwt }
    }
}

impl AsyncAuthorizeRequest<Body> for JWTAuth {
    type RequestBody = Body;
    type ResponseBody = Body;
    type Future = Pin<Box<dyn Future<Output = Result<Request<Self::RequestBody>, Response<Self::ResponseBody>>> + Send + 'static>>;

    fn authorize(&mut self, mut request: Request<Body>) -> Self::Future {
        let jwt = self.jwt;

        Box::pin(async move {
            let token = request.headers()
                .get(header::AUTHORIZATION)
                .map(|value| -> Result<_, ApiError> {
                    let token = value.to_str()
                        .map_err(|_| ApiError::Unauthenticated(String::from("Authorization请求头不是一个有效的字符串")))?
                        .strip_prefix("Bearer ")
                        .ok_or_else(|| ApiError::Unauthenticated(String::from("Authorization请求头必须以 Bearer 开头")))?;

                    Ok(token)
                })
                .transpose()?
                .ok_or_else(|| ApiError::Unauthenticated(String::from("Authorization请求头必须存在")))?;

            let principal = jwt.decode(token).map_err(|err| ApiError::Internal(err))?;
            request.extensions_mut().insert(principal);

            Ok(request)
        })
    }
}

pub fn get_auth_layer() -> &'static AsyncRequireAuthorizationLayer<JWTAuth> {
    &AUTH_LAYER
}