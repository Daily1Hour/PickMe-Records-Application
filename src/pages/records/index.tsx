import { Outlet } from "react-router-dom";
import { Container } from "@styleguide/react";

import Sidebar from "@/features/side";

const RecordPage = () => {
    return (
        <Container>
            <Sidebar />
            <Outlet />
        </Container>
    );
};

export default RecordPage;
