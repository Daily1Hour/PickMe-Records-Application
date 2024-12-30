import { Box, Flex, HStack, } from "@chakra-ui/react";
import PDFUploadForm from "./pdfForm";
import RecordForm from "./recordForm";
import { useEffect, useState } from "react";
import { fetchRecordById } from "../api/recordsApi";

const RecordDetails = ({ id }: { id: string | null }) => {
    const [selectedData, setSelectedData] = useState<{
        id: string | null;
        company: string;
        category: string;
        questions: { question: string; answer: string }[];
    }>({ id: null, company: "", category: "", questions: [] });
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    useEffect(() => {
        if (id === null) {
            // 선택된 레코드를 초기화하여 새로운 레코드 생성
            setSelectedData({
                id: null, // id를 null로 설정하여 새로운 레코드를 생성할 수 있게 함
                company: "",
                category: "",
                questions: [],
            });
            console.log(selectedData);
            console.log("새로운 레코드 생성, id가 null로 설정됨");
            return;
        }
        ;(async function fetchData() {
            try {
                const data = await fetchRecordById(id);

                // 가져온 데이터를 기반으로 선택된 데이터를 설정
                setSelectedData({
                    id: id,
                    company: data.enterpriseName,
                    category: data.category,
                    questions: data.details
                        ? data.details.map(
                              (detail: {
                                  question: string;
                                  answer: string;
                              }) => ({
                                  question: detail.question,
                                  answer: detail.answer,
                              }),
                          )
                        : [],
                });
            } catch (err) {
                setError("Failed to load record details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return (
        <Box minH="100vh" py={10}>
            <Flex direction="column" align="center" maxW="800px" mx="auto">
                <HStack gap={4}>
                    <Box w="600px">
                        <PDFUploadForm />
                    </Box>
                    <RecordForm
                        key={selectedData.id}
                        recordValues={selectedData}
                        recordId={selectedData?.id ?? undefined}
                    />
                </HStack>
            </Flex>
        </Box>
    );
};

export default RecordDetails;
