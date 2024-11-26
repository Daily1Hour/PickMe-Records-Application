import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";
import QAForm from "./QAForm";
import { useForm, FormProvider, Controller } from "react-hook-form";

interface FormData {
    company: string;
    category: string;
    questions: { question: string; answer: string }[];
}

function RecordForm() {
    const methods = useForm<FormData>({
        defaultValues: {
            company: "",
            category: "",
            questions: [{ question: "", answer: "" }],
        },
    });

    const onSubmit = (data: FormData) => {
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
                    <Box>
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
                    </Box>
                </Stack>
            </form>
        </FormProvider>
    );
}

export default RecordForm;
