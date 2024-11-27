import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import Sidebar from "./ui/sidebar";
import { useState } from "react";

import { Box, HStack, Flex } from "@chakra-ui/react";

const savedData: Record<string, { company: string; category: string; questions: { question: string; answer: string }[] }> = {
    "1": {
        company: "Example Company",
        category: "1차 면접",
        questions: [
            { question: "Tell me about yourself.", answer: "I am a software engineer..." },
        ],
    },
    "2": {
        company: "Another Company",
        category: "2차 면접",
        questions: [
            { question: "What are your strengths?", answer: "I am very diligent..." },
        ],
    },
    // 추가 데이터... 예시
};

const RecordPage = () => {

    const [selectedData, setSelectedData] = useState(savedData["1"]);

    const handleMenuSelect = (id: string) => {
        setSelectedData(savedData[id]); // 선택된 데이터 설정
    };

    const menuItems = Object.entries(savedData).map(([id, data]) => ({
        label: `${data.company} | ${data.category}`,
        id,
    }));

    return (
        <>
            <Sidebar menuItems={menuItems} onSelect={handleMenuSelect} />
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm defaultValues={selectedData} />
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}

export default RecordPage;
