import { Controller, useFormContext } from "react-hook-form";
import { Editable, EditableControl } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

export default function QAFormField({
    type,
    name,
    detailIndex,
}: {
    type: "question" | "answer";
    name: string;
    detailIndex: number;
}) {
    const { control } = useFormContext();
    const kor = type === "question" ? "질문" : "답변";

    return (
        <Field label={kor}>
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
                            {field.value || kor + "을 입력해주세요"}
                        </Editable.Preview>
                        <Editable.Textarea h="100px" />
                        <EditableControl />
                    </Editable.Root>
                )}
            />
        </Field>
    );
}
