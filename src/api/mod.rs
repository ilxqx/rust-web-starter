use axum::Router;
use crate::app::AppState;
use crate::app::error::{ApiError, ApiResult};
use crate::app::middleware::get_auth_layer;

mod user;
mod auth;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest(
            "/api",
            Router::new()
                .nest("/users", user::create_router())
                .route_layer(get_auth_layer())
                .nest("/auth", auth::create_router())
                .fallback(async || -> ApiResult<()> {
                    tracing::warn!("Not found");
                    Err(ApiError::NotFound)
                })
        )
        .method_not_allowed_fallback(async || -> ApiResult<()> {
            tracing::warn!("Method not allowed");
            Err(ApiError::MethodNotAllowed)
        })
}