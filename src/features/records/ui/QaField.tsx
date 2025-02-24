import { Controller, useFormContext } from "react-hook-form";
import { Stack } from "@chakra-ui/react";

import EditableField from "./EditableField";

export const QaField = ({
    name,
    detailIndex,
}: {
    name: string;
    detailIndex: number;
}) => {
    const types = ["question", "answer"];
    const korType: Record<string, string> = {
        question: "면접 질문",
        answer: "답변",
    };
    const { control } = useFormContext();

    return (
        <Stack spaceY={4}>
            {types.map((type) => (
                <Controller
                    name={`${name}.${detailIndex}.${type}`}
                    control={control}
                    render={({ field }) => (
                        <EditableField {...field} label={korType[type]} />
                    )}
                />
            ))}
        </Stack>
    );
};
