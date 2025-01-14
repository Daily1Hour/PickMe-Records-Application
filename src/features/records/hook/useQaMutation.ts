import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createDetail, deleteDetail } from "../api/detailsApi";
import { RecordDetailCreateDTO } from "../api/recordsDTOList";

export const useQaMutation = () => {
    
    const queryclient = useQueryClient();

    const { mutateAsync: createDetailMutation } = useMutation({
        mutationFn: ({
            interviewRecordId,
            data,
        }: {
            interviewRecordId: string;
            data: RecordDetailCreateDTO;
        }) => createDetail(interviewRecordId, data),
    });

    const { mutate: deleteDetailMutation } = useMutation({
        mutationFn: ({
            interviewRecordId,
            detailIndex,
        }: {
            interviewRecordId: string;
            detailIndex: number;
        }) => deleteDetail(interviewRecordId, detailIndex),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["record"] });
        },
    });

    return { createDetailMutation, deleteDetailMutation };
}