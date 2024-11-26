import RecordForm from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import Sidebar from "./ui/sidebar";

import { Box, HStack, Flex } from "@chakra-ui/react";

function RecordPage() {
    return (
        <>
            <Sidebar />
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm />
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}

export default RecordPage;
