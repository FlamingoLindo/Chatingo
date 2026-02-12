use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SettingsStruct {
    pub socket_url: String,
    pub client_id: String,
    pub token: String,
    pub url: String,
}

#[derive(Serialize, Deserialize)]
pub struct SettingsTokensStruct {
    pub client_id: String,
    pub token: String,
}
