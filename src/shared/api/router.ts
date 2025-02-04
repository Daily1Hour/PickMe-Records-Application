import type { Router } from "@remix-run/router";

// 의존성역전 사용 (DIP)
let router: Router | undefined;

// 의존성 주입
const setRouter = (newRouter: Router) => {
    router = newRouter;
};

// 간접 네비게이션 수행
const navigateTo = (path: string) => {
    if (router) {
        router.navigate(path);
    } else {
        throw new Error("Router is not set");
    }
};

export { setRouter, navigateTo };
