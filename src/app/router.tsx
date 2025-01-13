import { createBrowserRouter } from "react-router-dom";
import RecordPage from "@/pages/records";
import RecordDetails from "@/features/records";

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
);

export default router;
