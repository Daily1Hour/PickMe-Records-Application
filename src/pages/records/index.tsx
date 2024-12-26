import { useState, useEffect } from "react";
import Sidebar from "./ui/sidebar";
import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import { fetchSidebarData, fetchRecordById } from "./api/recordsApi";
import { Box, HStack, Flex, Spinner, Text } from "@chakra-ui/react";

const RecordPage = () => {
    const [menuItems, setMenuItems] = useState<{ id: string; label: string }[]>(
        [],
    );
    const [selectedData, setSelectedData] = useState<{
        id: string | null;
        company: string;
        category: string;
        questions: { question: string; answer: string }[];
    }>({ id: null, company: "", category: "", questions: [] });
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
        if (interviewRecordId === null) {
            // 선택된 레코드를 초기화하여 새로운 레코드 생성
            setSelectedData({
                id: null, // id를 null로 설정하여 새로운 레코드를 생성할 수 있게 함
                company: "",
                category: "",
                questions: [],
            });
            console.log(selectedData)
            console.log("새로운 레코드 생성, id가 null로 설정됨");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const data = await fetchRecordById(interviewRecordId);
    
            // 가져온 데이터를 기반으로 선택된 데이터를 설정
            setSelectedData({
                id: interviewRecordId,
                company: data.enterpriseName,
                category: data.category,
                questions: data.details
                    ? data.details.map(
                          (detail: { question: string; answer: string }) => ({
                              question: detail.question,
                              answer: detail.answer,
                          })
                      )
                    : [],
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
            <Sidebar
                menuItems={menuItems}
                onSelect={handleMenuSelect}
                itemsPerPage={10}
            />
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
                            <RecordForm
                                key={selectedData.id}
                                recordValues={selectedData}
                                recordId={selectedData?.id ?? undefined}
                            />
                        )}
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default RecordPage;
