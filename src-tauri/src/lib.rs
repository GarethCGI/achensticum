use std::time::Duration;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_pinia::Builder::new()
                .autosave(Duration::from_secs(60))
                .build(),
        )
        //.invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
