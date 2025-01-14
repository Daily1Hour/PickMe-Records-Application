import Sidebar from "@/features/side";
import { Outlet } from "react-router-dom";

const RecordPage = () => {
    return (
        <>
            <Sidebar />
            <Outlet/>
        </>
    );
};

export default RecordPage;