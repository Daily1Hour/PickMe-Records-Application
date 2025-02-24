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
    const types = ["question", "answer"];
    const {
        control,
        getValues,
        formState: { errors },
    } = useFormContext();
    const korType: Record<string, string> = {
        question: "면접 질문",
        answer: "답변",
    };

    const defaultCountQuestion = getValues(
        `${name}.${detailIndex}.question`,
    ).length;
    const defaultCountAnswer = getValues(
        `${name}.${detailIndex}.answer`,
    ).length;

    const countQuestion = useState<number>(defaultCountQuestion);
    const countAnswer = useState<number>(defaultCountAnswer);
    const countState = {
        question: {
            get: countQuestion[0],
            set: countQuestion[1],
        },
        answer: {
            get: countAnswer[0],
            set: countAnswer[1],
        },
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
                                    (countState as any)[type].set(
                                        e.value.length,
                                    )
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
                                <Text color="gray.400">
                                    {(countState as any)[type].get}/1000
                                </Text>
                                <EditableControl></EditableControl>
                            </Editable.Root>
                        )}
                    />
                </Field>
            ))}
        </Stack>
    );
};
