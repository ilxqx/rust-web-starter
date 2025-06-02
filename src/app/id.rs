use idgenerator::{IdGeneratorOptions, IdInstance};
use sea_orm::prelude::Date;

pub fn init() -> anyhow::Result<()> {
    let options = IdGeneratorOptions::new()
        .base_time(
            Date::from_ymd_opt(2025, 5, 1)
                .unwrap()
                .and_hms_opt(0, 0, 0)
                .unwrap()
                .and_utc()
                .timestamp_millis()
        )
        .worker_id(1)
        .worker_id_bit_len(4);
    
    Ok(IdInstance::init(options)?)
}

pub fn next_id() -> String {
    IdInstance::next_id().to_string()
}