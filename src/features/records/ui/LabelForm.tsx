import { Controller, useFormContext } from "react-hook-form";
import { Stack, Input } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

export const LabelForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const types = ["enterpriseName", "category"];
    const korType: Record<string, string> = {
        enterpriseName: "회사 이름",
        category: "면접 유형",
    };
    console.log(errors["enterpriseName"]);

    return (
        <Stack gap="10">
            {types.map((type) => (
                <Controller
                    key={type}
                    name={type}
                    control={control}
                    render={({ field }) => (
                        <Field
                            invalid={!!errors[type]}
                            errorText={errors[type]?.message as string}
                        >
                            <Input
                                {...field}
                                variant="flushed"
                                placeholder={`${korType[type]}`}
                            />
                        </Field>
                    )}
                />
            ))}
        </Stack>
    );
};
