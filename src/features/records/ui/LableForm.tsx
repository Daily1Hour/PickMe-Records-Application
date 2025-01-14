import { Controller, useFormContext } from "react-hook-form"
import { Stack, Input } from "@chakra-ui/react"

export const LabelForm = () => {
    const { control } = useFormContext();

    return (
        <Stack gap="10">
            <Controller
                name="enterpriseName"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        variant="flushed"
                        placeholder="회사 이름"
                    />
                )}
            />
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        variant="flushed"
                        placeholder="면접 유형"
                    />
                )}
            />
        </Stack>
    );
}