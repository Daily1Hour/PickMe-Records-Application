import { useState } from "react";
import Sidebar from "./ui/sidebar";
import RecordDetails from "./ui/RecordDetails";

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
