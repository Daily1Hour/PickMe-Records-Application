import type { Router } from "@remix-run/router";

// 의존성역전 사용 (DIP)
class RouteHandler {
    private router?: Router;

    // 의존성 주입
    public setRouter(router: Router) {
        this.router = router;
    }

    // 간접 네비게이션 수행
    public navigateTo(path: string) {
        if (this.router) {
            this.router.navigate(path);
        } else {
            throw new Error("Router is not set");
        }
    }
}

// 싱글톤 인스턴스 생성
const navigator = new RouteHandler();
// 컨텍스트 고정 후 멤버함수 추출
const navigateTo = navigator.navigateTo.bind(navigator);
const setRouter = navigator.setRouter.bind(navigateTo);

export { setRouter, navigateTo };
