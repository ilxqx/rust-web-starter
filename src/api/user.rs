use anyhow::Context;
use axum::{debug_handler, routing, Router};
use axum::extract::State;
use sea_orm::Condition;
use crate::app::AppState;
use sea_orm::prelude::*;
use crate::entity::prelude::*;
use crate::entity::sys_user;
use crate::error::ApiResult;
use crate::response::ApiResponse;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", routing::get(query_users))
}

#[debug_handler]
async fn query_users(State(AppState { db }): State<AppState>) -> ApiResult<ApiResponse<Vec<sys_user::Model>>> {
    let users = SysUser::find()
        .filter(
            Condition::all()
                .add(sys_user::Column::Gender.eq("male"))
                .add(sys_user::Column::Name.starts_with("张"))
                .add(Condition::any().add(sys_user::Column::Enabled.eq(true))),
        )
        .all(&db)
        .await
        .context("Failed to query users")?;

    Ok(ApiResponse::ok("ok", Some(users)))
}