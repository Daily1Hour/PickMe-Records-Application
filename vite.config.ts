import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // 환경변수 증설
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const serverPort = Number(process.env.VITE_SERVER_PORT); // 서버 포트
    const styleguideUrl = process.env.VITE_STYLEGUIDE_URL!; // 스타일가이드 URL

    // vite 설정
    return {
        plugins: [
            react(), // React 라이브러리 적용
            federation({
                // 모듈 페더레이션 적용
                remotes: {
                    "@styleguide": styleguideUrl,
                },
                shared: {
                    react: {
                        requiredVersion: "^18.3.1",
                    },
                    "react-dom": {
                        requiredVersion: "^18.3.1",
                    },
                    "@chakra-ui/react": {
                        requiredVersion: "^3.2.3",
                    },
                }, // 공유 모듈 중복 번들링 방지
            }),
            tsconfigPaths(), // tsconfig.json의 paths 설정을 적용
            nodePolyfills(), // node.js 라이브러리 polyfills를 적용
        ],
        build: {
            emptyOutDir: false,
            target: "esnext",
        },
        server: {
            // 개발 서버 설정
            port: serverPort,
            cors: true,
        },
        preview: {
            port: serverPort,
        },
        base: process.env.VITE_PUBLIC_URL,
    };
});
