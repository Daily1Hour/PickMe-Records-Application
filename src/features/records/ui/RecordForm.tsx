import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Record } from "@/entities/records/model/Record";
import { useRecordMutation } from "../hook/useRecordMutation";
import { LabelForm } from "./LabelForm";
import { QaForm } from "./QaForm";

const RecordForm: React.FC<{ record: Record }> = ({ record }) => {
    const navigate = useNavigate();
    const methods = useForm<Record>({
        defaultValues: record.recordId ? record : Record.empty(),
    });
    const recordId = record.recordId;

    console.log("RecordForm");
    const { create, update, updateDetailMutation } = useRecordMutation(); // custom hook

    const onSubmit = async (data: Record) => {
        try {
            if (!recordId) {
                // recordId가 null일 때 새로운 레코드 생성
                const newRecord = await create({ data });
                navigate(`/${newRecord.interviewRecordId}`);
                alert("저장했습니다.");
            } else {
                // 기존 레코드 수정
                update({ recordId, updatedata: data });
                data.details.forEach((detail, index) => {
                    updateDetailMutation({ recordId, index, detail });
                });
                alert("수정했습니다.");
            }
        } catch (error) {
            console.error("Error processing the record:", error);
            alert("Failed to process the record.");
        }
    };

    // useEffect(() => {
    //     methods.reset(record);
    // }, [record, methods]);

    return (
        <Box>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "800px", height: "500px", padding: "20px" }}
                >
                    <Stack>
                        <Heading>내 기록</Heading>
                        <LabelForm />
                        {recordId && <QaForm recordId={recordId} />}
                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                colorPalette="teal"
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
