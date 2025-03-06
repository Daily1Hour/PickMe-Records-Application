import { createBrowserRouter } from "react-router-dom";

import { setRouter } from "@/shared/api/router";
import RecordDetails from "@/features/records";
import RecordPage from "@/pages/records";

const basename = import.meta.env.VITE_PUBLIC_URL || "/";

const router = createBrowserRouter(
    [
        {
            element: <RecordPage />,
            children: [
                {
                    path: "/:id?",
                    element: <RecordDetails />,
                },
            ],
        },
    ],
    {
        basename,
    },
);

setRouter(router); // fsd 레이어 접근 규칙을 위해 shared 레이어로 의존

export default router;
