import { Stack, Input } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import FormDataValues from "../model/FormDataValues";

export default function TitleForm({
    control,
}: {
    control: Control<FormDataValues, FormDataValues>;
}) {
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
