import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import { navigateTo } from "@/shared/api/router";
import { useRecordMutation } from "../hook/useRecordMutation";
import { QaForm } from "./QaForm";
import { LabelForm } from "./LabelForm";
import { Record } from "@/entities/records/model/Record";
import { DeleteConfirm } from "./DeleteConfirm";
import { useRecordStore } from "../store/recodStore";
import { RecordSchema, RecordType } from "../model/RecordSchema";

const RecordForm = () => {
    const { record } = useRecordStore();

    const methods = useForm<RecordType>({
        defaultValues: record || Record.empty(),
        resolver: yupResolver(RecordSchema),
    });

    const recordId = record.recordId;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const { create, update, updateDetailMutation } = useRecordMutation();

    const handleDelete = (recordId: string) => {
        setIdToDelete(recordId);
        setDialogOpen(true);
    };

    const onSubmit = async (data: RecordType) => {
        try {
            if (!recordId) {
                const newRecord = await create({ data });
                navigateTo(`/${newRecord.interviewRecordId}`);
                alert("저장했습니다.");
            } else {
                update({ recordId, updatedata: data });
                data.details.forEach((detail, index) => {
                    updateDetailMutation({ recordId, index, detail });
                });
                alert("수정했습니다.");
                console.log(data);
            }
        } catch (error) {
            console.error("Error processing the record:", error);
            alert("Failed to process the record.");
        }
    };

    return (
        <Box>
            <DeleteConfirm
                recordToDelete={idToDelete}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "800px", height: "500px", padding: "20px" }}
                >
                    <Stack>
                        <Heading>내 기록</Heading>
                        <LabelForm />
                        {recordId && <QaForm />}
                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                colorPalette="teal"
                                borderRadius="30px"
                                w="100px"
                            >
                                {recordId ? "수정" : "저장"}
                            </Button>
                            {recordId ? (
                                <Button
                                    borderRadius="30px"
                                    w="100px"
                                    onClick={() => handleDelete(recordId)}
                                >
                                    삭제
                                </Button>
                            ) : null}
                        </HStack>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    );
};

export default RecordForm;
