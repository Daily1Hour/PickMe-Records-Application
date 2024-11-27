import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import Sidebar from "./ui/sidebar";
import React, { useState } from "react";

import { Box, HStack, Flex } from "@chakra-ui/react";

const savedData: Record<string, { company: string; category: string; questions: { question: string; answer: string }[] }> = {
    "회사명 | 면접유형 1": {
        company: "Example Company",
        category: "Technical Interview",
        questions: [
            { question: "Tell me about yourself.", answer: "I am a software engineer..." },
        ],
    },
    "회사명 | 면접유형 2": {
        company: "Another Company",
        category: "Behavioral Interview",
        questions: [
            { question: "What are your strengths?", answer: "I am very diligent..." },
        ],
    },
    // 추가 데이터...
};

const RecordPage = () => {

    const [selectedMenu, setSelectedMenu] = useState<string>("회사명 | 면접유형");
    const [formData, setFormData] = useState(savedData[selectedMenu]);

    const handleMenuSelect = (menuLabel: string) => {
        setSelectedMenu(menuLabel);
        setFormData(savedData[menuLabel] || { company: "", category: "", questions: [] });
    };
    return (
        <>
            <Sidebar onSelect={handleMenuSelect} />
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm defaultValues={formData} />
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}

export default RecordPage;
