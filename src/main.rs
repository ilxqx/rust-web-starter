mod api;
mod app;
mod config;
mod database;
mod entity;
mod error;
mod logger;
mod response;
mod server;
mod latency;
mod common;
mod serde;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    app::run(api::create_router()).await
}
