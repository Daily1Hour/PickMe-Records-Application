import { useState, useEffect } from "react";
import Sidebar from "./ui/sidebar";
import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import { fetchSidebarData, fetchRecordDetails } from "./api/recordsApi";
import { Box, HStack, Flex, Spinner, Text } from "@chakra-ui/react";

const RecordPage = () => {
    const [menuItems, setMenuItems] = useState<{ id: string; label: string }[]>([]);
    const [selectedData, setSelectedData] = useState<
        { company: string; category: string; questions: { question: string; answer: string }[] } | null>(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    useEffect(() => {
        const loadSidebarData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSidebarData(); 
                const formattedMenuItems = data.map(item => ({
                    id: item.id,
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

        loadSidebarData(); 
    }, []); 

    const handleMenuSelect = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            // 선택된 항목의 상세 데이터 호출
            const data = await fetchRecordDetails(id);
            setSelectedData({
                company: data.enterpriseName,
                category: data.category,
                questions: data.details.map(detail => ({
                    question: detail.question,
                    answer: detail.answer,
                })),
            });
        } catch (err) {
            setError("Failed to load record details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Sidebar menuItems={menuItems} onSelect={handleMenuSelect} itemsPerPage={10}/>
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <Text color="red.500">{error}</Text>
                        ) : (
                            <RecordForm defaultValues={selectedData || { company: "", category: "", questions: [] }} />
                        )}
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default RecordPage;