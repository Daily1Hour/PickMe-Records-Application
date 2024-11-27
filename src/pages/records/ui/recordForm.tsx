import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";
import QAForm from "./QAForm";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";

interface FormDataValues {
    company: string;
    category: string;
    questions: { question: string; answer: string }[];
}

const RecordForm: React.FC<{ defaultValues: FormDataValues }> = ({ defaultValues }) => {
    const methods = useForm<FormDataValues>({
        defaultValues: {
            company: "",
            category: "",
            questions: [{ question: "", answer: "" }],
        },
    });

    const { reset } = methods;

    useEffect(() => {
        // 선택된 데이터로 폼 초기화
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = (data: FormDataValues) => {
        console.log("Submitted Data:", data);
    };

    return (
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
    );
}

export default RecordForm;
