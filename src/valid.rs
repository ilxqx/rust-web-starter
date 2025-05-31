use crate::error::ApiError;
use crate::json::Json;
use crate::path::Path;
use crate::query::Query;
use axum::extract::{FromRequest, FromRequestParts, Request};
use axum::http::request::Parts;

#[derive(Debug, Clone, Default, FromRequest, FromRequestParts)]
#[from_request(via(axum_valid::Valid), rejection(ApiError))]
pub struct Valid<T>(pub T);

#[derive(Debug, Clone, Default)]
pub struct ValidQuery<T>(pub T);
#[derive(Debug, Clone, Default)]
pub struct ValidPath<T>(pub T);
#[derive(Debug, Clone, Default)]
pub struct ValidJson<T>(pub T);

// impl<S, T> FromRequestParts<S> for ValidQuery<T>
// where
//     S: Send + Sync,
//     Valid<Query<T>>: FromRequestParts<S, Rejection = ApiError>,
// {
//     type Rejection = ApiError;
//
//     async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
//         Ok(ValidQuery(
//             Valid::from_request_parts(parts, state).await?.0.0,
//         ))
//     }
// }
//
// impl<S, T> FromRequest<S> for ValidJson<T>
// where
//     S: Send + Sync,
//     Valid<axum::Json<T>>: FromRequest<S, Rejection = ApiError>,
// {
//     type Rejection = ApiError;
//
//     async fn from_request(request: Request, state: &S) -> Result<Self, Self::Rejection> {
//         Ok(ValidJson(Valid::from_request(request, state).await?.0.0))
//     }
// }

macro_rules! impl_from_request {
    ($name:ident, $wrapper:ident, FromRequestParts) => {
        impl<S, T> FromRequestParts<S> for $name<T>
        where
            S: Send + Sync,
            Valid<$wrapper<T>>: FromRequestParts<S, Rejection = ApiError>,
        {
            type Rejection = ApiError;

            async fn from_request_parts(
                parts: &mut Parts,
                state: &S,
            ) -> Result<Self, Self::Rejection> {
                Ok($name(Valid::from_request_parts(parts, state).await?.0.0))
            }
        }
    };
    ($name:ident, $wrapper:ident, FromRequest) => {
        impl<S, T> FromRequest<S> for $name<T>
        where
            S: Send + Sync,
            Valid<$wrapper<T>>: FromRequest<S, Rejection = ApiError>,
        {
            type Rejection = ApiError;

            async fn from_request(request: Request, state: &S) -> Result<Self, Self::Rejection> {
                Ok($name(Valid::from_request(request, state).await?.0.0))
            }
        }
    };
}

impl_from_request!(ValidQuery, Query, FromRequestParts);
impl_from_request!(ValidPath, Path, FromRequestParts);
impl_from_request!(ValidJson, Json, FromRequest);
