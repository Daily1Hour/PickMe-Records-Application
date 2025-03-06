import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Detail } from "@/entities/records/model";
import {
    createRecord,
    updateRecord,
    updateDetail,
    deleteRecord,
} from "../api/detailsApi";
import { RecordType } from "../model/RecordSchema";

export function useRecordMutation() {
    const queryclient = useQueryClient();

    const { mutateAsync: create } = useMutation({
        mutationFn: ({ data }: { data: RecordType }) => createRecord(data),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    const { mutate: update } = useMutation({
        mutationFn: ({
            recordId,
            updatedata,
        }: {
            recordId: string;
            updatedata: RecordType;
        }) => updateRecord(recordId, updatedata),
        onSuccess: (_data, { recordId }) => {
            queryclient.refetchQueries({ queryKey: ["side"] });
            queryclient.refetchQueries({ queryKey: ["record", recordId] });
        },
    });

    const { mutate: updateDetailMutation } = useMutation({
        mutationFn: ({
            recordId,
            index,
            detail,
        }: {
            recordId: string;
            index: number;
            detail: Detail;
        }) => updateDetail(recordId, index, detail),
    });

    const { mutate: deleteMutation } = useMutation({
        mutationFn: ({ recordId }: { recordId: string }) =>
            deleteRecord(recordId),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    return { create, update, updateDetailMutation, deleteMutation };
}
