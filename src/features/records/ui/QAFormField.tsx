import { Controller, useFormContext } from "react-hook-form";
import { Editable, Stack } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

import EditableControl from "./EditableControl";

export default function QAFormField({
    name,
    detailIndex,
}: {
    name: string;
    detailIndex: number;
}) {
    const { control } = useFormContext();

    const types = ["question", "answer"];
    const kor: Record<(typeof types)[number], string> = {
        question: "질문",
        answer: "답변",
    };

    return (
        <Stack spaceY={4}>
            {types.map((type) => (
                <Field label={kor[type]} key={type}>
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
                                    {field.value || kor[type] + "을 입력해주세요"}
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
}
