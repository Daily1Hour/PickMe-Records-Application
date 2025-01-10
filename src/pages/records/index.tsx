import Sidebar from "@/features/side";
import { Outlet } from "react-router-dom";

const RecordPage = () => {
    console.log("test")
    return (
        <>
            <Sidebar />
            {/* <RecordDetails id={selectedId} /> */}
            <Outlet/>
        </>
    );
};

export default RecordPage;