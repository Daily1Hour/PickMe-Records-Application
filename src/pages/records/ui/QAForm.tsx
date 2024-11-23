import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";

import { Field } from "../../../shared/chakra-ui/Field";

interface FormData {
    id: number;
    question: string;
    answer: string;
}

interface QAFormProps {
    forms: FormData[];
    onAddForm: () => void;
    onUpdateForm: (id: number, field: keyof FormData, value: string) => void;
    onDeleteForm: (id: number) => void;
}

const QAForm: React.FC<QAFormProps> = ({
    forms,
    onAddForm,
    onUpdateForm,
    onDeleteForm,
}) => {
    return (
        <Box>
            <VStack align="stretch">
                <form>
                    {forms.map((form) => (
                        <Box
                            m={10}
                            key={form.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                        >
                            <Field label="면접질문">
                                <Input
                                    value={form.question}
                                    onChange={(e) =>
                                        onUpdateForm(
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
                                        onUpdateForm(
                                            form.id,
                                            "answer",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="답변"
                                    variant="flushed"
                                />
                            </Field>
                            <HStack justifyContent="flex-end">
                                <Button
                                    m={4}
                                    bg="grey"
                                    size="sm"
                                    onClick={() => onDeleteForm(form.id)}
                                >
                                    X
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </form>
                <Button bg="#009A6E" onClick={onAddForm} w="50px">
                    +
                </Button>
            </VStack>
        </Box>
    );
};

export default QAForm;
