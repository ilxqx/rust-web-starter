use axum::Router;
use sea_orm::DatabaseConnection;
use crate::config;

mod database;
pub mod error;
mod logger;
pub mod response;
mod server;
mod latency;
pub mod common;
pub mod serde;
pub mod query;
pub mod path;
pub mod json;
pub mod valid;
pub mod validation;
pub mod id;
pub mod enumeration;
mod auth;

#[derive(Clone)]
pub struct AppState {
    pub db: DatabaseConnection,
}

impl AppState {
    pub fn new(db: DatabaseConnection) -> Self {
        Self { db }
    }
}

pub async fn run(router: Router<AppState>) -> anyhow::Result<()> {
    logger::init();
    id::init()?;
    tracing::info!("Starting app server...");
    
    let db = database::init().await?;
    let state = AppState::new(db);
    let server = server::Server::new(config::get().server());
    
    server.start(state, router).await
}