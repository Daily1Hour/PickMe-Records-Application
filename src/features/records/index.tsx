import { Box, Flex, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PDFUploadForm from "./ui/PDFUploadForm";
import RecordForm from "./ui/RecordForm";
import { fetchRecordById } from "./api/detailsApi";
import { Record } from "@/entities/records/model/Record";

const RecordDetails = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const { data:record } = useQuery<Record>({
        queryKey: ["record", id],
        queryFn: () => fetchRecordById(id!),
        staleTime: 1000 * 60 * 60,
        enabled: !!id,
        initialData: id ? undefined : Record.empty(),
    });

    return (
        record && (
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm
                            key={record.updatedAt}
                            record={record}
                        />
                    </HStack>
                </Flex>
            </Box>
        )
    );
};

export default RecordDetails;
