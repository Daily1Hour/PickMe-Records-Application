import { useState } from "react";

import Sidebar from "@/features/side";
import RecordDetails from "@/features/records";
import { Outlet } from "react-router-dom";

const RecordPage = () => {
    console.log("test")
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const handleMenuSelect = async (interviewRecordId: string | null) => {
        setSelectedId(interviewRecordId);
    };

    return (
        <>
            <Sidebar onSelect={handleMenuSelect} />
            {/* <RecordDetails id={selectedId} /> */}
            <Outlet/>
        </>
    );
};

export default RecordPage;