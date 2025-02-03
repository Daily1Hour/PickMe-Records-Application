import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import { useRecordMutation } from "../hook/useRecordMutation";
import { QaForm } from "./QaForm";
import { LabelForm } from "./LabelForm";
import { Record } from "@/entities/records/model/Record";
import { DeleteConfirm } from "./deleteConfirm";
import { useRecordStore } from "../store/recodStore";

const RecordForm = () => {
    const navigate = useNavigate();
    const { record, setRecord } = useRecordStore();
    const methods = useForm<Record>({
        defaultValues: record || Record.empty(),
    });
    const recordId = record.recordId;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const { create, update, updateDetailMutation } = useRecordMutation();

    const handleDelete = (recordId: string) => {
        setIdToDelete(recordId);
        setDialogOpen(true);
    };

    const onSubmit = async (data: Record) => {
        try {
            if (!recordId) {
                const newRecord = await create({ data });
                navigate(`/${newRecord.interviewRecordId}`);
                alert("저장했습니다.");
            } else {
                update({ recordId, updatedata: data });
                data.details.forEach((detail, index) => {
                    updateDetailMutation({ recordId, index, detail });
                });
                setRecord(data);
                alert("수정했습니다.");
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
