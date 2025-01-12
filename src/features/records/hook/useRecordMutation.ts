import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
    createRecord,
    updateRecord,
    updateDetail,
    deleteDetail,
} from "../api/detailsApi";

export default function useRecordMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: create } = useMutation({
        mutationFn: createRecord,
        onSuccess: ({ interviewRecordId }) => {
            queryClient.refetchQueries({ queryKey: ["side"] });
            navigate(`/${interviewRecordId}`);
        },
    });

    const { mutate: update } = useMutation({
        mutationFn: updateRecord,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["side"] });
        },
    });

    const { mutate: updateDetailMutation } = useMutation({
        mutationFn: updateDetail,
    });

    const { mutate: deleteDetailMutation } = useMutation({
        mutationFn: deleteDetail,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["record"] });
        },
    });

    return {
        create,
        update,
        updateDetail: updateDetailMutation,
        deleteDetailMutation,
    };
}
