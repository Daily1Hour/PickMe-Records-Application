import React, { useState } from "react";
import { Text, Editable, EditableControl } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

export default function EditableField({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: React.FormEventHandler;
    label: string;
}) {
    const [textLength, setTextLength] = useState<number>(value.length);

    return (
        <Field label={label}>
            <Editable.Root
                maxLength={1000}
                defaultValue={value}
                onSubmit={onChange}
                onChange={onChange}
                onValueChange={(e) => setTextLength(e.value.length)}
            >
                <Editable.Preview>
                    {value || `${label}을 입력해주세요`}
                </Editable.Preview>

                <Editable.Textarea h="100px" />

                <Text color="gray.400">{textLength} / 1000</Text>

                <EditableControl />
            </Editable.Root>
        </Field>
    );
}
