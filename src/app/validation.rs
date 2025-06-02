use std::borrow::Cow;
use std::cell::LazyCell;
use std::collections::HashMap;
use regex::Regex;
use validator::ValidationError;

const MOBILE_PHONE_REGEX: LazyCell<Regex> =
    LazyCell::new(|| Regex::new(r"^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$").expect("Failed to compile mobile phone regex"));

pub fn is_mobile_phone(value: &str) -> Result<(), ValidationError> {
    if MOBILE_PHONE_REGEX.is_match(value) {
        Ok(())
    } else {
        Err(build_validation_error("手机号码格式不正确"))
    }
}

fn build_validation_error(message: &'static str) -> ValidationError {
    ValidationError {
        code: Cow::from("invalid"),
        message: Some(Cow::from(message)),
        params: HashMap::new(),
    }
}