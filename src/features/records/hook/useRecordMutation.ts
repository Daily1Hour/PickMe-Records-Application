import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRecord, updateRecord, updateDetail, deleteRecord } from "../api/detailsApi";
import { Record, Detail } from "@/entities/records/model/";

export function useRecordMutation() {
    const queryclient = useQueryClient();
    
    const { mutateAsync: create } = useMutation({
        mutationFn: ({ data }: { data: Record }) =>
            createRecord(data),
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
            updatedata: Record;
        }) => updateRecord(recordId, updatedata),
        onSuccess: () => {
            const queryKeys = [["side"], ["record"]]; // 리패치할 쿼리 키들
            queryKeys.forEach((key) => {
                queryclient.refetchQueries({ queryKey: key });
            });
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
    })

    const { mutate: deleteMutation } = useMutation({
        mutationFn: ({
            recordId,
        }: {
            recordId: string;
        }) => deleteRecord(recordId),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    return { create, update, updateDetailMutation, deleteMutation };
};