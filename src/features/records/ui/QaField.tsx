import { Controller, useFormContext } from "react-hook-form";
import { Editable, Stack, Text } from "@chakra-ui/react";
import EditableControl from "./EditableControl";
import { Field } from "@/shared/chakra-ui/Field";
import { useState } from "react";

export const QaField = ({
    name,
    detailIndex,
}: {
    name: string;
    detailIndex: number;
}) => {
    const [countText, setCountText] = useState(0);

    const types = ["question", "answer"];
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const korType: Record<string, string> = {
        question: "면접 질문",
        answer: "답변",
    };

    console.log(errors);

    return (
        <Stack spaceY={4}>
            {types.map((type) => (
                <Field key={type} label={`${korType[type]}`} invalid>
                    <Controller
                        name={`${name}.${detailIndex}.${type}`}
                        control={control}
                        render={({ field }) => (
                            <Editable.Root
                                maxLength={1000}
                                onValueChange={(e) =>
                                    setCountText(e.value.length)
                                }
                                defaultValue={field.value}
                                onSubmit={field.onChange}
                                onChange={field.onChange}
                            >
                                <Editable.Preview>
                                    {field.value ||
                                        `${korType[type]}을 입력해주세요`}
                                </Editable.Preview>
                                <Editable.Textarea h="100px" />
                                <Text color="gray.400">{countText}/1000</Text>
                                <EditableControl />
                            </Editable.Root>
                        )}
                    />
                </Field>
            ))}
        </Stack>
    );
};
