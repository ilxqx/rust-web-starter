use crate::app::AppState;
use crate::common::{Page, PaginationParams};
use crate::entity::prelude::*;
use crate::entity::sys_user;
use crate::entity::sys_user::ActiveModel;
use crate::error::{ApiError, ApiResult};
use crate::path::Path;
use crate::response::ApiResponse;
use crate::valid::{ValidJson, ValidQuery};
use axum::extract::State;
use axum::{Router, debug_handler, routing};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, Condition, IntoActiveModel, QueryOrder, QueryTrait};
use serde::Deserialize;
use validator::Validate;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", routing::get(find_page))
        .route("/", routing::post(create))
        .route("/{id}", routing::put(update))
        .route("/{id}", routing::delete(delete))
}

#[derive(Debug, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct UserQueryParams {
    keyword: Option<String>,
    #[validate(nested)]
    #[serde(flatten)]
    pagination: PaginationParams,
}

#[debug_handler]
async fn find_page(
    State(AppState { db }): State<AppState>,
    ValidQuery(UserQueryParams {
        keyword,
        pagination,
    }): ValidQuery<UserQueryParams>,
) -> ApiResult<ApiResponse<Page<sys_user::Model>>> {
    let paginator = SysUser::find()
        .apply_if(keyword.as_ref(), |query, keyword| {
            query.filter(
                Condition::any()
                    .add(sys_user::Column::Name.contains(keyword))
                    .add(sys_user::Column::Account.contains(keyword)),
            )
        })
        .order_by_desc(sys_user::Column::CreatedAt)
        .paginate(&db, pagination.size);

    let total = paginator.num_items().await?;
    let items = paginator.fetch_page(pagination.page - 1).await?;
    let page = Page::from_pagination(pagination, total, items);

    Ok(ApiResponse::ok("ok", Some(page)))
}

#[derive(Debug, Deserialize, Validate, DeriveIntoActiveModel)]
pub struct UserParams {
    #[validate(length(min = 1, max = 16, message = "姓名长度为1-16"))]
    pub name: String,
    pub gender: String,
    #[validate(length(min = 1, max = 16, message = "账号长度为1-16"))]
    pub account: String,
    #[validate(length(min = 6, max = 16, message = "密码长度为6-16"))]
    pub password: String,
    #[validate(custom(function = "crate::validation::is_mobile_phone"))]
    pub mobile_phone: String,
    pub birthday: Date,
    #[serde(default)]
    pub enabled: bool,
}

#[debug_handler]
async fn create(
    State(AppState { db }): State<AppState>,
    ValidJson(params): ValidJson<UserParams>,
) -> ApiResult<ApiResponse<sys_user::Model>> {
    let mut active_model = params.into_active_model();
    active_model.password = ActiveValue::Set(bcrypt::hash(
        &active_model.password.take().unwrap(),
        bcrypt::DEFAULT_COST,
    )?);
    let result = active_model.insert(&db).await?;

    Ok(ApiResponse::ok("ok", Some(result)))
}

#[debug_handler]
async fn update(
    State(AppState { db }): State<AppState>,
    Path(id): Path<String>,
    ValidJson(params): ValidJson<UserParams>,
) -> ApiResult<ApiResponse<sys_user::Model>> {
    let existed_user = SysUser::find_by_id(id)
        .one(&db)
        .await?
        .ok_or_else(|| ApiError::Biz(String::from("待修改的用户不存在")))?;
    let password = params.password.clone();
    let mut active_model = params.into_active_model();
    active_model.id = ActiveValue::Unchanged(existed_user.id);
    if password.is_empty() {
        active_model.password = ActiveValue::Unchanged(existed_user.password);
    } else {
        active_model.password = ActiveValue::Set(bcrypt::hash(
            &active_model.password.take().unwrap(),
            bcrypt::DEFAULT_COST,
        )?);
    }

    let result = active_model.update(&db).await?;

    Ok(ApiResponse::ok("ok", Some(result)))
}

#[debug_handler]
async fn delete(
    State(AppState { db }): State<AppState>,
    Path(id): Path<String>,
) -> ApiResult<ApiResponse<()>> {
    let existed_user = SysUser::find_by_id(&id)
        .one(&db)
        .await?
        .ok_or_else(|| ApiError::Biz(String::from("待删除的用户不存在")))?;
    let result = existed_user.delete(&db).await?;
    tracing::info!(
        "Deleted user: {}, affected rows: {}",
        id,
        result.rows_affected
    );

    Ok(ApiResponse::ok("ok", None))
}
