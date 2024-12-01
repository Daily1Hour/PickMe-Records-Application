import { defineConfig, loadEnv } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import vitePluginSingleSpa, { SingleSpaPluginOptions } from "vite-plugin-single-spa";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const isProduction = mode === "production";
    const serverPort = Number(process.env.VITE_SERVER_PORT); // 서버포트

    let vitePluginSingleSpaOptions: SingleSpaPluginOptions | undefined;

    switch (process.env.VITE_MF_TYPE) {
        case "application":
            vitePluginSingleSpaOptions = {
                serverPort,
                spaEntryPoints: "src/app/application.tsx",
            };
            break;
        case "parcel":
            vitePluginSingleSpaOptions = {
                serverPort,
                spaEntryPoints: "src/app/parcel.tsx",
            };
            break;
    }

    return {
        plugins: [
            react(), // React 라이브러리 적용
            tsconfigPaths(), // tsconfig.json의 paths 설정을 적용
            nodePolyfills(), // node.js 라이브러리 polyfills를 적용
            isProduction && vitePluginSingleSpa(vitePluginSingleSpaOptions), // single-spa 라이브러리 적용
        ],
        build: {
            rollupOptions: {
                input: {
                    index: "index.html", // 일반 빌드용 진입점
                    application: "./src/app/application.tsx",
                    parcel: "./src/app/parcel.tsx",
                },
            },
        },
        server: {
            // 개발 서버 설정
            port: serverPort,
            cors: true,
        },
        base: process.env.VITE_PUBLIC_URL,
    };
});
