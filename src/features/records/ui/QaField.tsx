import { Controller, useFormContext } from "react-hook-form";
import { Editable, Stack } from "@chakra-ui/react";
import EditableControl from "./EditableControl";
import { Field } from "@/shared/chakra-ui/Field";

export const QaField = ({
    name,
    detailIndex,
}: {
    name: string;
    detailIndex: number;
}) => {
    const types = ["question", "answer"];
    const { control } = useFormContext();
    const korType: Record<string, string> = {
        question: "면접 질문",
        answer: "답변",
    };

    return (
        <Stack spaceY={4}>
            {types.map((type) => (
                <Field label={`${korType[type]}`}>
                    <Controller
                        name={`${name}.${detailIndex}.${type}`}
                        control={control}
                        render={({ field }) => (
                            <Editable.Root
                                defaultValue={field.value}
                                onSubmit={field.onChange}
                                onChange={field.onChange}
                            >
                                <Editable.Preview>
                                    {field.value ||
                                        `${korType[type]}을 입력해주세요`}
                                </Editable.Preview>
                                <Editable.Textarea h="100px" />
                                <EditableControl />
                            </Editable.Root>
                        )}
                    />
                </Field>
            ))}
        </Stack>
    );
};
