import { useForm, FormProvider } from "react-hook-form";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import Record from "@/entities/records/model/Record";
import useRecordMutation from "../hook/useRecordMutation";
import QAForm from "./QAForm";
import TitleForm from "./TitleForm";

const RecordForm: React.FC<{
    recordValues: Record;
    recordId?: string;
}> = ({ recordValues, recordId }) => {
    const methods = useForm({ defaultValues: recordValues });

    const { create, update, updateDetail } = useRecordMutation();

    const onSubmit = async (data: Record) => {
        try {
            if (!recordId) {
                // recordId가 null일 때 새로운 레코드 생성
                create({ data });
                alert("저장했습니다.");
            } else {
                // 기존 레코드 수정
                update({ interviewRecordId: recordId, data });
                data.details.forEach((detail, index) => {
                    updateDetail({
                        interviewRecordId: recordId,
                        detailIndex: index,
                        payload: detail,
                    });
                });
                alert("수정했습니다.");
            }
        } catch (error) {
            console.error("Error processing the record:", error);
            alert("Failed to process the record.");
        }
    };

    return (
        <Box>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "800px", height: "500px", padding: "20px" }}
                >
                    <Stack>
                        <Heading>내 기록</Heading>

                        <TitleForm control={methods.control} />

                        {recordValues && recordId && (
                            <QAForm
                                details={recordValues.details}
                                interviewRecordId={recordId}
                            />
                        )}

                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                bg="#009A6E"
                                borderRadius="30px"
                                w="100px"
                            >
                                {recordId ? "수정" : "저장"}
                            </Button>
                        </HStack>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    );
};

export default RecordForm;
