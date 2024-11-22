import Record from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import Sidebar from "./ui/sidebar";
import { Box, Button, Input, Text, HStack, Flex } from "@chakra-ui/react";

function RecordPage() {
    return (
        <>
            <Sidebar />
            <Box minH="100vh" py={10} px={5}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <PDFUploadForm />
                        <Record />
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}

export default RecordPage;
