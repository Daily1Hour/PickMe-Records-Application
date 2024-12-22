import { useState, useEffect } from "react";
import Sidebar from "./ui/sidebar";
import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import { fetchSidebarData, fetchRecordById } from "./api/recordsApi";
import { Box, HStack, Flex, Spinner, Text } from "@chakra-ui/react";

const RecordPage = () => {
    const [menuItems, setMenuItems] = useState<{ id: string; label: string }[]>([]);
    const [selectedData, setSelectedData] = useState<{ id: string, company: string; category: string; questions: { question: string; answer: string }[];}>({ id: "", company: "", category: "", questions: [] });
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    useEffect(() => {
        const loadSidebarData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSidebarData();  // API에서 사이드바 데이터 가져오기
                const formattedMenuItems = data.map(item => ({
                    id: item.interviewRecordId,
                    label: `${item.enterpriseName} | ${item.category}`,
                }));
                setMenuItems(formattedMenuItems);  // 메뉴 항목 설정
            } catch (err) {
                setError("Failed to load sidebar data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadSidebarData();
    }, []);  // 최초 렌더링 시 한번만 호출

    // 메뉴 항목을 클릭했을 때 호출되는 함수
    const handleMenuSelect = async (interviewRecordId: string) => {
        setLoading(true);
        setError(null);
        try {
            // 선택된 항목의 상세 데이터 호출
            const data = await fetchRecordById(interviewRecordId);

            // questions이 없을 경우 빈 배열로 초기화
            setSelectedData({
                id: interviewRecordId,
                company: data.enterpriseName,
                category: data.category,
                questions: data.details ? data.details.map((detail: { question: string; answer: string; }) => ({
                    question: detail.question,
                    answer: detail.answer,
                })) : [], // details가 없다면 빈 배열로 처리
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
                            <RecordForm recordValues={selectedData}
                            recordId={selectedData?.id || ""} />
                        )}
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default RecordPage;