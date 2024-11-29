import { defineConfig, loadEnv } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const serverPort = Number(process.env.VITE_SERVER_PORT); // 서버포트
    const spaEntryPoints = "src/app/mfa.tsx";
    const isMFA = mode === "mfa";

    return {
        plugins: [
            tsconfigPaths(), // tsconfig.json의 paths 설정을 적용
            nodePolyfills(), // node.js 라이브러리 polyfills를 적용
            isMFA &&
                vitePluginSingleSpa({
                    // single-spa 라이브러리 적용
                    serverPort,
                    spaEntryPoints,
                }),
        ],
        server: {
            port: serverPort,
            cors: true,
        },
    };
});
