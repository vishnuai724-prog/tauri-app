#![warn(clippy::all, clippy::pedantic)]
#![deny(unsafe_code)]

use log::info;
use serde::Serialize;
use thiserror::Error;

// ──────────────────────────────────────────────────
// Error Handling
// ──────────────────────────────────────────────────

/// Application-level error type for structured error handling.
/// All Tauri commands should return `Result<T, AppError>` instead of panicking.
#[derive(Debug, Error)]
pub enum AppError {
    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Internal error: {0}")]
    Internal(String),

    #[error("Tauri error: {0}")]
    Tauri(#[from] tauri::Error),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Serialization error: {0}")]
    Serialization(#[from] serde_json::Error),
}

/// Serialize `AppError` for the frontend — Tauri commands require
/// error types to implement `Serialize`.
impl Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

// ──────────────────────────────────────────────────
// Commands
// ──────────────────────────────────────────────────

/// Greet a user by name, demonstrating proper error handling.
///
/// Returns an error if the name is empty.
#[tauri::command]
fn greet(name: &str) -> Result<String, AppError> {
    if name.trim().is_empty() {
        return Err(AppError::Validation("Name cannot be empty".to_string()));
    }

    info!("Greeting user: {name}");
    Ok(format!("Hello, {name}! You've been greeted from Rust!"))
}

// ──────────────────────────────────────────────────
// Application Entry Point
// ──────────────────────────────────────────────────

/// Initialize and run the Tauri application with all plugins.
///
/// # Panics
///
/// Panics if the Tauri runtime fails to initialize (e.g., missing
/// `WebView2` on Windows, or invalid `tauri.conf.json`).
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri::menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder};
                use tauri::Emitter;

                let handle = app.handle();

                // Build custom menus
                let file_menu = SubmenuBuilder::new(handle, "File").quit().build()?;
                let edit_menu = SubmenuBuilder::new(handle, "Edit")
                    .undo()
                    .redo()
                    .separator()
                    .cut()
                    .copy()
                    .paste()
                    .select_all()
                    .build()?;
                let window_menu = SubmenuBuilder::new(handle, "Window")
                    .minimize()
                    .maximize()
                    .close_window()
                    .build()?;

                // Custom About & Update Items
                let check_update_item =
                    MenuItemBuilder::with_id("check_update", "Check for Updates").build(handle)?;
                let about_item =
                    MenuItemBuilder::with_id("custom_about", "About QLIMS").build(handle)?;
                let help_menu = SubmenuBuilder::new(handle, "Help")
                    .item(&check_update_item)
                    .separator()
                    .item(&about_item)
                    .build()?;

                let menu = MenuBuilder::new(handle)
                    .items(&[&file_menu, &edit_menu, &window_menu, &help_menu])
                    .build()?;

                app.set_menu(menu)?;

                // Listen for menu events
                app.on_menu_event(move |app_handle, event| {
                    if event.id() == "custom_about" {
                        let _ = app_handle.emit("open-about-dialog", ());
                    } else if event.id() == "check_update" {
                        let _ = app_handle.emit("check-for-updates", ());
                    }
                });
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
