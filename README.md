# Financial Manager Desktop App

**Financial Manager** is a desktop application built with **Next.js 15**, **TypeScript**, and **Electron**, leveraging components from NextAdmin along with custom extensions. It allows you to manage your finances both in the browser and as a native desktop application.

---

## 📂 Project Structure

├─ src/ # Next.js App Router + components
│ ├─ app/
│ └─ components/
├─ main/ # Electron main process
│ └─ main.ts
├─ electron-dist/ # Compiled Electron main.js after build
├─ assets/ # Icons, splash screen, and resources
├─ public/ # public files (e.g., splash.html)
├─ node_modules/
├─ package.json
├─ tsconfig.json
├─ tsconfig.electron.json
├─ next.config.mjs
├─ tailwind.config.ts
└─ README.md

---

## ⚡ Scripts

````json
"scripts": {
  "dev": "concurrently \"yarn dev:next\" \"yarn dev:electron\"",
  "dev:next": "next dev",
  "dev:electron": "wait-on http://localhost:3000 && ELECTRON_START_URL=http://localhost:3000 electron electron-dist/main.js",
  "build:main": "tsc -p tsconfig.electron.json",
  "build": "next build && yarn build:main",
  "start": "concurrently \"next start\" \"electron .\"",
  "dist": "electron-builder"
}

yarn dev – runs both the Next.js dev server and Electron simultaneously.

yarn dev:next – runs Next.js locally in the browser.

yarn dev:electron – starts Electron pointing to the local dev server.

yarn build:main – compiles electron/main.ts into electron-dist/main.js.

yarn build – builds Next.js and Electron main process.

yarn start – runs the production build locally.

yarn dist – packages the app for distribution using electron-builder.

Electron Builder Configuration
"build": {
  "appId": "com.robert.financialapp",
  "productName": "Financial Manager 1.0.0",
  "files": [
    "electron-dist/**/*",
    ".next/**/*",
    "package.json"
  ],
  "directories": {
    "buildResources": "assets"
  },
  "mac": {
    "icon": "assets/icon.icns",
    "identity": null
  },
  "win": {
    "icon": "assets/icon.ico"
  }
}


appId – unique identifier for your app.

productName – the name and version of the application.

files – folders included in the packaged app.

directories.buildResources – folder containing icons and other resources.

mac.icon / win.icon – platform-specific application icons.

🚀 Development Workflow

Run in browser (Next.js):

yarn dev:next


Run Electron pointing to dev server:

yarn dev:electron


Run both together:

yarn dev


Build production versions:

yarn build


Start production locally:

yarn start


Package for macOS/Windows/Linux:

yarn dist

## ⚡ Electron `main.ts` Example

This is the main process for the Electron app, compiled to `main.js` after running `yarn build:main`. It includes a splash screen while the Next.js app loads.

```ts
import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;
let splash: BrowserWindow | null;

function createWindow() {
  // Splash screen while main window loads
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    resizable: false,
    transparent: false,
    alwaysOnTop: true,
  });
  splash.loadFile(path.join(__dirname, "../public/splash.html"));

  // Main application window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false, // hide until ready
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Load Next.js dev server or production build
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || "http://localhost:3000"
  );

  mainWindow.once("ready-to-show", () => {
    if (splash) {
      splash.close();
      splash = null;
    }
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
Notes:

Splash screen (splash.html) displays while the main Next.js app is loading.

ELECTRON_START_URL is used in development to point Electron to the local Next.js dev server.

In production, Electron loads the compiled Next.js app from the build or static export.

mainWindow.show() is only called after the app is ready to prevent a white flash.

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

📦 Notes

In development, Electron loads the Next.js dev server (http://localhost:3000).

In production, Electron loads the compiled Next.js build (.next folder or static export).

Use dynamic imports in Next.js for async server components and fallback skeletons to optimize performance in Electron.

Ensure all assets like icons are present in the assets/ folder for proper packaging.
````
