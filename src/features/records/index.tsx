import { Box, Flex, HStack } from "@chakra-ui/react";

import PDFUploadForm from "./ui/PDFUploadForm";
import RecordForm from "./ui/RecordForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchRecordById } from "./api/detailsApi";

const RecordDetails = () => {
    const { id } = useParams<{ id: string | undefined}>();
    const { data } = useQuery({
        queryKey: ["record", id],
        queryFn: () => 
            fetchRecordById(id!),
        staleTime: 1000*60*60,
        initialData: id ? undefined : {
            id: undefined,
            enterpriseName: "",
            category: "",
            details: [],
        }
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
                            key={data?.id}
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
