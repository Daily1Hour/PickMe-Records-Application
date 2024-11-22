import { Box, Button, Input, VStack } from "@chakra-ui/react";

import { Field } from "../../../shared/chakra-ui/recordBox";

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
  }) =>
    {return (
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
                            <Button
                                bg="grey"
                                size="sm"
                                onClick={() => onDeleteForm(form.id)}>
                                X
                            </Button>
                        </Box>
                    ))}
                </form>
                <Button bg="green" onClick={onAddForm} size="sm">
                    +
                </Button>
            </VStack>
        </Box>
    );
};

export default QAForm;
