use crate::settings::settings_struct::SettingsTokensStruct;

use config::{Config, ConfigError};
use std::{fs::File, path::Path};

#[tauri::command]
pub fn load_tokens() -> SettingsTokensStruct {
    if !Path::new("settings.toml").exists() {
        File::create("settings.toml").expect("Failed to create settings.toml");
    }

    let settings = Config::builder()
        .add_source(config::File::with_name("settings.toml"))
        .add_source(config::Environment::with_prefix("APP"))
        .build()
        .unwrap();

    let token = match settings.get::<String>("user.token") {
        Ok(token) => {
            // println!("TOKEN: {}", token);
            token
        }
        Err(ConfigError::NotFound(..)) => {
            // println!("NO token FOUND!");
            String::new()
        }
        Err(e) => {
            println!("There has been an error: {}", e);
            String::new()
        }
    };

    let client_id = match settings.get::<String>("user.client_id") {
        Ok(client_id) => {
            // println!("client_id: {}", client_id);
            client_id
        }
        Err(ConfigError::NotFound(..)) => {
            println!("NO client_id FOUND!");
            String::new()
        }
        Err(e) => {
            println!("There has been an error: {}", e);
            String::new()
        }
    };

    let user_id = match settings.get::<String>("user.user_id") {
        Ok(user_id) => {
            // println!("user_id: {}", user_id);
            user_id
        }
        Err(ConfigError::NotFound(..)) => {
            println!("NO user_id FOUND!");
            String::new()
        }
        Err(e) => {
            println!("There has been an error: {}", e);
            String::new()
        }
    };

    SettingsTokensStruct {
        token,
        client_id,
        user_id,
    }
}
