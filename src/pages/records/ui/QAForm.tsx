import {
    Box,
    Button,
    HStack,
    VStack,
    Editable,
    IconButton,
} from "@chakra-ui/react";

import { Field } from "../../../shared/chakra-ui/Field";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

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
                            <Field label="면접 질문" my={4}>
                                <Editable.Root defaultValue="질문을 입력해주세요.">
                                    <Editable.Preview />
                                    <Editable.Textarea
                                        value={form.question}
                                        onChange={(e) =>
                                            onUpdateForm(
                                                form.id,
                                                "question",
                                                e.target.value,
                                            )
                                        }
                                        h="100px"
                                    />
                                    <Editable.Control>
                                        <Editable.EditTrigger asChild>
                                            <IconButton
                                                variant="ghost"
                                                size="xs"
                                            >
                                                <LuPencilLine />
                                            </IconButton>
                                        </Editable.EditTrigger>
                                        <Editable.CancelTrigger asChild>
                                            <IconButton
                                                variant="outline"
                                                size="xs"
                                            >
                                                <LuX />
                                            </IconButton>
                                        </Editable.CancelTrigger>
                                        <Editable.SubmitTrigger asChild>
                                            <IconButton
                                                variant="outline"
                                                size="xs"
                                            >
                                                <LuCheck />
                                            </IconButton>
                                        </Editable.SubmitTrigger>
                                    </Editable.Control>
                                </Editable.Root>
                            </Field>
                            <Field label="답변">
                                <Editable.Root defaultValue="답변을 입력해주세요.">
                                    <Editable.Preview />
                                    <Editable.Textarea
                                        value={form.answer}
                                        onChange={(e) =>
                                            onUpdateForm(
                                                form.id,
                                                "answer",
                                                e.target.value,
                                            )
                                        }
                                        h="100px"
                                    />
                                    <Editable.Control>
                                        <Editable.EditTrigger asChild>
                                            <IconButton
                                                variant="ghost"
                                                size="xs"
                                            >
                                                <LuPencilLine />
                                            </IconButton>
                                        </Editable.EditTrigger>
                                        <Editable.CancelTrigger asChild>
                                            <IconButton
                                                variant="outline"
                                                size="xs"
                                            >
                                                <LuX />
                                            </IconButton>
                                        </Editable.CancelTrigger>
                                        <Editable.SubmitTrigger asChild>
                                            <IconButton
                                                variant="outline"
                                                size="xs"
                                            >
                                                <LuCheck />
                                            </IconButton>
                                        </Editable.SubmitTrigger>
                                    </Editable.Control>
                                </Editable.Root>
                            </Field>
                            <HStack justifyContent="flex-end">
                                <Button
                                    m={4}
                                    bg="none"
                                    size="sm"
                                    onClick={() => onDeleteForm(form.id)}
                                >
                                    ✖
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
