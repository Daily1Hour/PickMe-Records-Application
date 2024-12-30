import { useState, useEffect } from "react";
import Sidebar from "./ui/sidebar";
import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import { fetchSidebarData, fetchRecordById } from "./api/recordsApi";
import { Box, HStack, Flex, Spinner, Text } from "@chakra-ui/react";
import RecordDetails from "./ui/RecordDetails";

const RecordPage = () => {
    const [menuItems, setMenuItems] = useState<{ id: string; label: string }[]>(
        [],
    );
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    const loadSidebarData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSidebarData();
            const formattedMenuItems = data.map((item) => ({
                id: item.interviewRecordId,
                label: `${item.enterpriseName} | ${item.category}`,
            }));
            setMenuItems(formattedMenuItems);
        } catch (err) {
            setError("Failed to load sidebar data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSidebarData();
    }, []);

    const handleMenuSelect = async (interviewRecordId: string | null) => {
        setSelectedId(interviewRecordId)
    }

    return (
        <>
            <Sidebar
                menuItems={menuItems}
                onSelect={handleMenuSelect}
                itemsPerPage={10}
            />
           <RecordDetails id={selectedId} />
        </>
    );
};

export default RecordPage;
