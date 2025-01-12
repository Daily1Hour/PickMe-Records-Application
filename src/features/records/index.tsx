import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, HStack } from "@chakra-ui/react";

import Record from "@/entities/records/model/Record";
import { fetchRecordById } from "./api/detailsApi";
import { PDFUploadForm, RecordForm } from "./ui";

const RecordDetails = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const { data } = useQuery({
        queryKey: ["record", id],
        queryFn: () => {
            if (!id) {
                return new Record(null, "", "", "", "", []);
            }
            return fetchRecordById(id);
        },
        staleTime: 1000 * 60 * 60,
    });

    return (
        data && (
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm
                            key={id}
                            recordValues={data}
                            recordId={id}
                        />
                    </HStack>
                </Flex>
            </Box>
        )
    );
};

export default RecordDetails;
