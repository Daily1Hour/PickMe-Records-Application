import { Controller, useFormContext } from "react-hook-form";
import { Stack, Input } from "@chakra-ui/react";

export const LabelForm = () => {
    const { control } = useFormContext();

    const types = ["enterpriseName", "category"];
    const korType: Record<string, string> = {
        enterpriseName: "회사 이름",
        category: "면접 유형",
    };

    return (
        <Stack gap="10">
            {types.map((type) => (
                <Controller
                    key={type}
                    name={type}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant="flushed"
                            placeholder={`${korType[type]}`}
                        />
                    )}
                />
            ))}
        </Stack>
    );
};
