mod config;
mod database;
mod entity;
mod logger;

use crate::entity::sys_user;
use axum::extract::State;
use axum::response::IntoResponse;
use axum::{Router, debug_handler, routing};
use entity::prelude::*;
use sea_orm::Condition;
use sea_orm::prelude::*;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    logger::init();
    let db = database::init().await?;
    let router = Router::new()
        .route("/", routing::get(index))
        .route("/users", routing::get(query_users))
        .with_state(db);

    let port = config::get().server().port();

    let listener = TcpListener::bind(format!("0.0.0.0:{port}")).await?;

    tracing::info!("Listening on http://0.0.0.0:{port}");

    axum::serve(listener, router).await?;

    Ok(())
}

#[debug_handler]
async fn index() -> &'static str {
    "Hello Rust!"
}

#[debug_handler]
async fn query_users(State(db): State<DatabaseConnection>) -> impl IntoResponse {
    let users = SysUser::find()
        .filter(
            Condition::all()
                .add(sys_user::Column::Gender.eq("male"))
                .add(sys_user::Column::Name.starts_with("张"))
                .add(Condition::any().add(sys_user::Column::Enabled.eq(true))),
        )
        .all(&db)
        .await
        .unwrap();

    axum::Json(users)
}
