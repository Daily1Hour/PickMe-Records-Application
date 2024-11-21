import React, { useState } from "react";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";

import { Field } from "./recordBox";

interface FormData {
    id: number;
    question: string;
    answer: string;
}

const QAForm: React.FC = () => {
    const [forms, setForms] = useState<FormData[]>([]);

    // 폼 추가 핸들러
    const addForm = () => {
        setForms((prevForms) => [
            ...prevForms,
            { id: Date.now(), question: "", answer: "" },
        ]);
    };

    // 폼 삭제 핸들러
    const deleteForm = (id: number) => {
        setForms((prevForms) => prevForms.filter((form) => form.id !== id));
    };

    // 폼 데이터 변경 핸들러
    const handleInputChange = (
        id: number,
        field: keyof FormData,
        value: string,
    ) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.id === id ? { ...form, [field]: value } : form,
            ),
        );
    };

    // 폼 제출 핸들러 (전체 폼 데이터 출력)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(forms);
    };

    return (
        <Box p={8}>
            <VStack align="stretch">
                <form>
                    {forms.map((form) => (
                        <Box
                            key={form.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                        >
                            <Field label="면접질문">
                                <Input
                                    value={form.question}
                                    onChange={(e) =>
                                        handleInputChange(
                                            form.id,
                                            "question",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="질문"
                                    variant="flushed"
                                />
                            </Field>
                            <Field label="답변">
                                <Input
                                    value={form.answer}
                                    onChange={(e) =>
                                        handleInputChange(
                                            form.id,
                                            "answer",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="답변"
                                    variant="flushed"
                                />
                            </Field>
                            <Button
                                bg="grey"
                                size="sm"
                                onClick={() => deleteForm(form.id)}>
                                X
                            </Button>
                        </Box>
                    ))}
                </form>
                <Button bg="green" onClick={addForm} size="sm">
                    +
                </Button>
                <Button
                    m="20px"
                    type="submit"
                    bg="#009A6E"
                    onClick={handleSubmit}
                >
                    저장
                </Button>
            </VStack>
        </Box>
    );
};

export default QAForm;
