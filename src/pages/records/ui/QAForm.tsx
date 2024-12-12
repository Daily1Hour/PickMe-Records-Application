import { Box, Button, HStack, VStack, Editable } from "@chakra-ui/react";
import { Field } from "../../../shared/chakra-ui/Field";
import EditableControl from "./editable-control";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
}

const QAForm: React.FC<QAFormProps> = ({ name, details }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name,
    });

    useEffect(() => {
        if (details && details.length > 0) {
            details.forEach(detail => append(detail)); // 초기 데이터를 필드에 추가
        }
    }, [details, append]);

    return (
        <VStack align="stretch">
            {fields.map((field, index) => (
                <Box
                    m={5}
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
                                <Editable.Root defaultValue={field.value} onSubmit={field.onChange}>
                                    <Editable.Preview>{field.value || "질문을 입력해주세요"}</Editable.Preview>
                                    <Editable.Textarea {...field} h="100px" />
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
                                <Editable.Root defaultValue={field.value} onSubmit={field.onChange}>
                                    <Editable.Preview>{field.value || "답변을 입력해주세요"}</Editable.Preview>
                                    <Editable.Textarea {...field} h="100px" />
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
    );
};

export default QAForm;
