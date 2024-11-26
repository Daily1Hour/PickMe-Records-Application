import { Box, Button, HStack, VStack, Editable } from "@chakra-ui/react";
import { Field } from "../../../shared/chakra-ui/Field";
import EditableControl from "./editable-control";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";

interface QAFormProps {
    name: string;
}

const QAForm: React.FC<QAFormProps> = ({ name }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name: "questions",
    });

    return (
        <Box>
            <VStack align="stretch">
                {fields.map((field, index) => (
                    <Box
                        m={10}
                        key={field.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                    >
                        <Field label="면접 질문" my={4}>
                            <Controller
                                name={`${name}.${index}.question`}
                                control={control}
                                render={({ field }) => (
                                    <Editable.Root placeholder="질문을 입력해주세요">
                                        <Editable.Preview />
                                        <Editable.Textarea
                                            {...field}
                                            h="100px"
                                        />
                                        <EditableControl />
                                    </Editable.Root>
                                )}
                            />
                        </Field>
                        <Field label="답변">
                            <Controller
                                name={`${name}.${index}.answer`}
                                control={control}
                                render={({ field }) => (
                                    <Editable.Root placeholder="답변을 입력해주세요">
                                        <Editable.Preview />
                                        <Editable.Textarea
                                            {...field}
                                            h="100px"
                                        />
                                        <EditableControl />
                                    </Editable.Root>
                                )}
                            />
                        </Field>
                        <HStack justifyContent="flex-end">
                            <Button
                                m={4}
                                bg="none"
                                size="sm"
                                onClick={() => remove(index)}
                            >
                                ✖
                            </Button>
                        </HStack>
                    </Box>
                ))}
                <Button bg="#009A6E" onClick={() => append({})} w="50px">
                    +
                </Button>
            </VStack>
        </Box>
    );
};

export default QAForm;
