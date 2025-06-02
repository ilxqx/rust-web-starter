use axum::Router;
use crate::app::AppState;
use crate::app::error::{ApiError, ApiResult};

mod user;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .nest(
            "/api",
            Router::new()
                .nest("/users", user::create_router())
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