use axum::{routing, Router};
use tower_http::compression::CompressionLayer;
use crate::app::AppState;
use crate::app::error::{ApiError, ApiResult};
use crate::app::middleware::get_auth_layer;
use crate::web::{index_handler, static_assets_handler};

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
        .nest(
            "/static",
            Router::new()
                .route("/{*file}", routing::get(static_assets_handler))
                .route_layer(CompressionLayer::new())
        )
        .method_not_allowed_fallback(async || -> ApiResult<()> {
            tracing::warn!("Method not allowed");
            Err(ApiError::MethodNotAllowed)
        })
        .fallback(index_handler)
}