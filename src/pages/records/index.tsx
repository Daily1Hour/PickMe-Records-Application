import { useState } from "react";

import Sidebar from "@/features/side";
import RecordDetails from "@/features/records";

const RecordPage = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const handleMenuSelect = async (interviewRecordId: string | null) => {
        setSelectedId(interviewRecordId);
    };

    return (
        <>
            <Sidebar onSelect={handleMenuSelect} />
            <RecordDetails id={selectedId} />
        </>
    );
};

export default RecordPage;
