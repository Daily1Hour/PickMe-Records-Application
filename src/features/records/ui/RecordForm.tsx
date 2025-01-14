import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import { useRecordMutation } from "../hook/useRecordMutation";
import { QAForm } from "./QAForm";
import { LabelForm } from "./LableForm";

interface FormDataValues {
    enterpriseName: string;
    category: string;
    details: { question: string; answer: string }[];
}

const RecordForm: React.FC<{
    recordValues: FormDataValues;
    recordId?: string;
}> = ({ recordValues, recordId }) => {
    const navigate = useNavigate();
    const methods = useForm<FormDataValues>({
        defaultValues: recordValues,
    });

    const { reset } = methods; // useForm hook

    const { create, update, updateDetailMutation } = useRecordMutation(); // custom hook

    useEffect(() => {
        reset(recordValues);
    }, [recordValues, reset]);

    const onSubmit = async (data: FormDataValues) => {
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
                        <QAForm
                            name="details"
                            details={recordValues.details}
                            interviewRecordId={recordId}
                        />
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
