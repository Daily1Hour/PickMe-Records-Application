import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";
import QAForm from "./QAForm";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
    createRecord,
    updateDetail,
    updateRecord,
} from "../api/recordsApi";
import { InterviewRecordCreateDTO, InterviewRecordUpdateDTO } from "../api/recordsApiList"

interface FormDataValues {
    company: string;
    category: string;
    questions: { question: string; answer: string }[];
}

const RecordForm: React.FC<{ defaultValues: FormDataValues; recordId: string }> = ({
    defaultValues, recordId,
}) => {
    const methods = useForm<FormDataValues>({
        defaultValues: {
            company: "",
            category: "",
            questions: [{ question: "", answer: "" }],
        },
    });

    const { reset } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = async (data: FormDataValues) => {
        try {
            if (!recordId) {
                const payload: InterviewRecordCreateDTO = {
                    enterpriseName: data.company,
                    category: data.category,
                    details: data.questions.map((q) => ({
                        question: q.question,
                        answer: q.answer,
                    })),
                };

                await createRecord(payload);
                alert("저장했습니다.");
            } else {
                const updatedPayload: InterviewRecordUpdateDTO = {
                    enterpriseName: data.company,
                    category: data.category,
                };

                await updateRecord(recordId, updatedPayload);

                for (let i = 0; i < data.questions.length; i++) {
                    const detail = data.questions[i];
                    await updateDetail(recordId, i, detail);
                }

                alert("저장했습니다.");
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
                        <Stack gap="10">
                            <Controller
                                name="company"
                                control={methods.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        variant="flushed"
                                        placeholder="회사 이름"
                                    />
                                )}
                            />
                            <Controller
                                name="category"
                                control={methods.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        variant="flushed"
                                        placeholder="면접 유형"
                                    />
                                )}
                            />
                        </Stack>
                        <QAForm name="questions" details={defaultValues.questions || []} interviewRecordId={recordId} />
                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                bg="#009A6E"
                                borderRadius="30px"
                                w="100px"
                            >
                                수정
                            </Button>
                        </HStack>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    );
};

export default RecordForm;