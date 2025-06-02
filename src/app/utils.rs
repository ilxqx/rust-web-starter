use crate::app::error::ApiResult;

pub fn encode_password(password: &str) -> ApiResult<String> {
    Ok(bcrypt::hash(password, bcrypt::DEFAULT_COST)?)
}

pub fn verify_password(password: &str, hashed_password: &str) -> ApiResult<bool> {
    Ok(bcrypt::verify(password, hashed_password)?)
}