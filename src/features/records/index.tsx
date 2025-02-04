import { Box, Flex, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import PDFUploadForm from "./ui/PDFUploadForm";
import RecordForm from "./ui/RecordForm";
import { fetchRecordById } from "./api/detailsApi";
import { Record } from "@/entities/records/model/Record";
import { useRecordStore } from "./store/recodStore";

const RecordDetails = () => {
    const { record, setRecord } = useRecordStore();
    const { id } = useParams<{ id: string | undefined }>();

    const { data: fetchedRecord } = useQuery<Record>({
        queryKey: ["record", id],
        queryFn: () => fetchRecordById(id!),
        staleTime: 1000 * 60 * 60,
        enabled: !!id,
        initialData: id ? undefined : Record.empty(),
    });

    useEffect(() => {
        if (fetchedRecord) {
            setRecord(fetchedRecord);
        }
    }, [fetchedRecord, setRecord]);

    return (
        record && (
            <Box minH="100vh" py={10}>
                <Flex direction="column" align="center" maxW="800px" mx="auto">
                    <HStack gap={4}>
                        <Box w="600px">
                            <PDFUploadForm />
                        </Box>
                        <RecordForm key={record.updatedAt} />
                    </HStack>
                </Flex>
            </Box>
        )
    );
};

export default RecordDetails;
