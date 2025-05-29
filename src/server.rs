use std::net::SocketAddr;
use axum::Router;
use tokio::net::TcpListener;
use crate::app::AppState;
use crate::config::ServerConfig;

pub struct Server {
    config: &'static ServerConfig
}

impl Server {
    pub fn new(config: &'static ServerConfig) -> Self {
        Self { config }
    }

    pub async fn start(&self, state: AppState, router: Router<AppState>) -> anyhow::Result<()> {
        let router = self.build_router(state, router);
        let port = self.config.port();
        
        let listener = TcpListener::bind(format!("0.0.0.0:{}", port)).await?;
        tracing::info!("Listening on {}", listener.local_addr()?);
        
        axum::serve(
            listener,
            router.into_make_service_with_connect_info::<SocketAddr>()
        ).await?;
        
        Ok(())
    }

    fn build_router(&self, state: AppState, router: Router<AppState>) -> Router {
        Router::new()
            .merge(router)
            .with_state(state)
    }
}