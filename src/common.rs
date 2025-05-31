use serde::{Deserialize, Serialize};
use validator::Validate;
use crate::serde::deserialize_number;

const DEFAULT_PAGE: u64 = 1;
const DEFAULT_SIZE: u64 = 15;

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Validate)]
pub struct PaginationParams {
    #[validate(range(min = 1, message = "页码必须大于0"))]
    #[serde(default = "default_page", deserialize_with = "deserialize_number")]
    pub page: u64,
    #[validate(range(min = 1, max = 100, message = "分页大小必须在1到100之间"))]
    #[serde(default = "default_size", deserialize_with = "deserialize_number")]
    pub size: u64
}

fn default_page() -> u64 {
    DEFAULT_PAGE
}

fn default_size() -> u64 {
    DEFAULT_SIZE
}

#[derive(Debug, Serialize)]
pub struct Page<T> {
    pub page: u64,
    pub size: u64,
    pub total: u64,
    pub items: Vec<T>
}

impl<T> Page<T> {
    pub fn new(page: u64, size: u64, total: u64, items: Vec<T>) -> Self {
        Self { page, size, total, items }
    }
    
    pub fn from_pagination(pagination: PaginationParams, total: u64, items: Vec<T>) -> Self {
        Self::new(pagination.page, pagination.size, total, items)
    }
}