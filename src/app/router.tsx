import { createBrowserRouter } from "react-router-dom";
import RecordPage from "@/pages/records";
import RecordDetails from "@/features/records";

const basename = import.meta.env.VITE_PUBLIC_URL;
const router = createBrowserRouter(
    [
        {
            path: "/",
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

export default router;
