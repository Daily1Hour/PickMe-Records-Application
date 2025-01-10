import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import RecordPage from "@/pages/records";
import RecordDetails from "@/features/records";

const basename = import.meta.env.VITE_SERVER_URL;

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RecordPage />,
            children: [
                {
                    path: "/records/interview/:id",
                    element: <RecordDetails />,
                },
            ],
        },
    ],
);

export default router;
