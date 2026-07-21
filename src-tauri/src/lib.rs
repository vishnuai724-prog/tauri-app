#![warn(clippy::all, clippy::pedantic)]
#![deny(unsafe_code)]

use log::info;
use serde::Serialize;
use thiserror::Error;

// ──────────────────────────────────────────────────
// Error Handling
// ──────────────────────────────────────────────────
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
                use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
                use tauri::{Emitter, Manager};

                let handle = app.handle();

                // File Menu
                let quit_item = MenuItemBuilder::with_id("quit", "Quit QLIMS")
                    .accelerator("CmdOrCtrl+Q")
                    .build(handle)?;
                let file_menu = SubmenuBuilder::new(handle, "File")
                    .item(&quit_item)
                    .build()?;

                // Edit Menu (Predefined usually works for edit actions, but we provide text)
                let undo_item = PredefinedMenuItem::undo(handle, Some("Undo"))?;
                let redo_item = PredefinedMenuItem::redo(handle, Some("Redo"))?;
                let cut_item = PredefinedMenuItem::cut(handle, Some("Cut"))?;
                let copy_item = PredefinedMenuItem::copy(handle, Some("Copy"))?;
                let paste_item = PredefinedMenuItem::paste(handle, Some("Paste"))?;
                let select_all_item = PredefinedMenuItem::select_all(handle, Some("Select All"))?;

                let edit_menu = SubmenuBuilder::new(handle, "Edit")
                    .item(&undo_item)
                    .item(&redo_item)
                    .separator()
                    .item(&cut_item)
                    .item(&copy_item)
                    .item(&paste_item)
                    .separator()
                    .item(&select_all_item)
                    .build()?;

                // Window Menu
                let minimize_item = MenuItemBuilder::with_id("minimize", "Minimize")
                    .accelerator("CmdOrCtrl+M")
                    .build(handle)?;
                let maximize_item = MenuItemBuilder::with_id("maximize", "Maximize")
                    .build(handle)?;
                let close_item = MenuItemBuilder::with_id("close", "Close Window")
                    .accelerator("CmdOrCtrl+W")
                    .build(handle)?;

                let window_menu = SubmenuBuilder::new(handle, "Window")
                    .item(&minimize_item)
                    .item(&maximize_item)
                    .item(&close_item)
                    .build()?;

                // Help Menu
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
                    match event.id().as_ref() {
                        "quit" => app_handle.exit(0),
                        "minimize" => {
                            if let Some(window) = app_handle.get_webview_window("main") {
                                let _ = window.minimize();
                            }
                        }
                        "maximize" => {
                            if let Some(window) = app_handle.get_webview_window("main") {
                                let is_maximized = window.is_maximized().unwrap_or(false);
                                if is_maximized {
                                    let _ = window.unmaximize();
                                } else {
                                    let _ = window.maximize();
                                }
                            }
                        }
                        "close" => {
                            if let Some(window) = app_handle.get_webview_window("main") {
                                let _ = window.close();
                            }
                        }
                        "custom_about" => {
                            let _ = app_handle.emit("open-about-dialog", ());
                        }
                        "check_update" => {
                            let _ = app_handle.emit("check-for-updates", ());
                        }
                        _ => {}
                    }
                });
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
