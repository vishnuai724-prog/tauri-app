# Tauri App

An enterprise-grade, cross-platform desktop application built with **Tauri 2**, **React 19**, **TypeScript 5**, and **Vite 7**.

---

## Prerequisites

### All Platforms

| Tool   | Version  | Install                                         |
| ------ | -------- | ----------------------------------------------- |
| Node.js | ≥ 18     | [nodejs.org](https://nodejs.org/)               |
| Rust   | stable   | [rustup.rs](https://rustup.rs/)                 |
| npm    | ≥ 9      | Bundled with Node.js                            |

### Windows

- **WebView2** — Ships with Windows 10 (1803+) and Windows 11. If missing, the NSIS installer will download it automatically.
- **Visual Studio Build Tools** with "Desktop development with C++" workload.

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

### macOS

- **Xcode Command Line Tools**:

```bash
xcode-select --install
```

### Linux (Debian/Ubuntu)

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libappindicator3-dev \
  librsvg2-dev \
  patchelf \
  libgtk-3-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev
```

### Linux (Fedora)

```bash
sudo dnf install webkit2gtk4.1-devel \
  openssl-devel \
  curl wget file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  gtk3-devel \
  patchelf
```

### Linux (Arch)

```bash
sudo pacman -S --needed \
  webkit2gtk-4.1 \
  base-devel \
  curl wget file \
  openssl appmenu-gtk-module \
  gtk3 libappindicator-gtk3 \
  librsvg libvips patchelf
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd tauri-app

# 2. Install frontend dependencies
npm ci

# 3. Run in development mode (launches Tauri + Vite HMR)
npm run tauri:dev
```

---

## Available Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start Vite dev server only (frontend)            |
| `npm run build`     | TypeScript compile + Vite production build       |
| `npm run tauri:dev` | Full Tauri dev mode with HMR                     |
| `npm run tauri:build` | Production build — generates platform installer |
| `npm run lint`      | Run ESLint (zero warnings enforced)              |
| `npm run lint:fix`  | Run ESLint with auto-fix                         |
| `npm run format`    | Format code with Prettier                        |
| `npm run format:check` | Check formatting without modifying files      |
| `npm run type-check` | Run TypeScript type checking                    |

---

## Project Architecture

```
tauri-app/
├── .github/workflows/     # CI/CD (GitHub Actions)
│   ├── ci.yml             # Lint + Build on push/PR
│   └── release.yml        # Build & publish on version tags
├── src/                   # Frontend (React + TypeScript)
│   ├── App.tsx            # Root component
│   ├── App.css            # Application styles
│   └── main.tsx           # React entry point
├── src-tauri/             # Backend (Rust + Tauri)
│   ├── src/
│   │   ├── lib.rs         # Commands, error handling, plugins
│   │   └── main.rs        # Desktop entry point
│   ├── capabilities/      # Tauri permission scopes
│   ├── icons/             # App icons (all platforms)
│   ├── Cargo.toml         # Rust dependencies & lint config
│   ├── tauri.conf.json    # Tauri configuration
│   ├── rustfmt.toml       # Rust formatting rules
│   └── clippy.toml        # Clippy lint thresholds
├── .editorconfig          # Cross-editor formatting
├── .gitattributes         # Line ending normalization
├── .prettierrc.json       # Prettier configuration
├── eslint.config.js       # ESLint flat config (v9+)
├── tsconfig.json          # TypeScript (strict mode)
├── vite.config.ts         # Vite + path aliases
├── .env                   # Base environment variables
├── .env.development       # Dev overrides
└── .env.production        # Production settings
```

---

## Build & Release

### Development Build

```bash
npm run tauri:dev
```

### Production Build

```bash
npm run tauri:build
```

Platform-specific installers are generated in `src-tauri/target/release/bundle/`:

| Platform | Installer Types        |
| -------- | ---------------------- |
| Windows  | `.msi`, `.exe` (NSIS)  |
| macOS    | `.dmg`, `.app`         |
| Linux    | `.AppImage`, `.deb`    |

### Creating a Release

```bash
# Tag and push to trigger the release workflow
git tag v0.1.0
git push origin v0.1.0
```

---

## Code Quality

This project enforces enterprise-grade code quality:

- **TypeScript**: Maximum strictness (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, etc.)
- **ESLint**: v9 flat config with `typescript-eslint/strict`, React Hooks, consistent type imports
- **Prettier**: Consistent formatting with LF line endings
- **Rust Clippy**: Pedantic lints + `unsafe_code = "deny"`
- **Rustfmt**: Enforced formatting (100-char width, Unix line endings)
- **EditorConfig**: Cross-editor consistency
- **Git**: LF normalization via `.gitattributes`

---

## Security

- **Content Security Policy (CSP)**: Strict CSP configured in `tauri.conf.json`
- **Capability-scoped permissions**: Granular API access defined in `src-tauri/capabilities/`
- **No unsafe Rust**: `#![deny(unsafe_code)]` enforced project-wide

---

## License

Copyright © 2026 vishn. All rights reserved.
