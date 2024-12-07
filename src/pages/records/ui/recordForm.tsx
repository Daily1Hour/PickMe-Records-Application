import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";
import QAForm from "./QAForm";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
    createRecord, InterviewRecordCreateDTO
} from "../api/recordsApi";

interface FormDataValues {
    company: string;
    category: string;
    questions: { question: string; answer: string }[];
}

const RecordForm: React.FC<{ defaultValues: FormDataValues }> = ({
    defaultValues,
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
            const payload: InterviewRecordCreateDTO = {
                enterpriseName: data.company,
                category: data.category,
                details: data.questions.map(question => ({
                    question: question.question,
                    answer: question.answer,
                })), // 질문과 답변 배열을 API에 맞는 형식으로 변환
            };
    
            await createRecord(payload);
            alert("Record created successfully!");
        } catch (error) {
            console.error("Error creating record:", error);
            alert("Failed to create record.");
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
                        <QAForm name="questions" />
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
