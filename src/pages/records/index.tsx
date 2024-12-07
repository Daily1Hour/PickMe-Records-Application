import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import Sidebar from "./ui/sidebar";
import { useEffect, useState } from "react";
import { fetchRecords } from "./api/recordsApi";

import { Box, HStack, Flex } from "@chakra-ui/react";

const RecordPage = () => {
    const [savedData, setSavedData] = useState<
        Record<string, { company: string; category: string; questions: { question: string; answer: string }[] }>
    >({});
    const [selectedData, setSelectedData] = useState<
        { company: string; category: string; questions: { question: string; answer: string }[] } | null
    >(null);

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const data = await fetchRecords();
                console.log("Fetched Data:", data);
    
                const formattedData = Object.entries(data).reduce(
                    (acc, [id, record]) => ({
                        ...acc,
                        [id]: {
                            company: record.enterpriseName,
                            category: record.category,
                            questions: (record.details || []).map(detail => ({
                                question: detail.question || "",
                                answer: detail.answer || "",
                            })),
                        },
                    }),
                    {} as Record<string, { company: string; category: string; questions: { question: string; answer: string }[] }>
                );
                setSavedData(formattedData);
                setSelectedData(formattedData[Object.keys(formattedData)[0]] || null); // 첫 번째 데이터 선택
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
    
        loadRecords();
    }, []);

    const handleMenuSelect = (id: string) => {
        if (savedData[id]) {
            setSelectedData(savedData[id]);
        } else {
            console.warn(`No data found for id: ${id}`);
        }
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
                        {selectedData && <RecordForm defaultValues={selectedData} />}
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default RecordPage;