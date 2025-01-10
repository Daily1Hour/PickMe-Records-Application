import { Box, Flex, HStack } from "@chakra-ui/react";

import PDFUploadForm from "./ui/pdfForm";
import RecordForm from "./ui/recordForm";
import { fetchRecordById } from "./api/detailsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const RecordDetails = () => {
    console.log("das")
    const { id } = useParams<{ id: string }>();
    const { data } = useQuery({
        queryKey: ["record", id],
        queryFn: () => {
            if (!id) {
                return {
                    id: null, // id를 null로 설정하여 새로운 레코드를 생성할 수 있게 함
                    enterpriseName: "",
                    category: "",
                    details: [],
                };
            }
            return fetchRecordById(id);
        },
        staleTime: 1000*60*60
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
                            key={data.id}
                            recordValues={data}
                            recordId={data?.id ?? undefined}
                        />
                    </HStack>
                </Flex>
            </Box>
        )
    );
};

export default RecordDetails;
