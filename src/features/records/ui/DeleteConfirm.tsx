import {
    DialogRoot,
    DialogContent,
    DialogFooter,
    DialogActionTrigger,
    Button,
    Text,
    DialogCloseTrigger,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/shared/chakra-ui/toaster";

import { navigateTo } from "@/shared/api/router";
import { useRecordMutation } from "../hook/useRecordMutation";

export const DeleteConfirm = ({
    recordToDelete,
    isDialogOpen,
    setDialogOpen,
}: {
    recordToDelete: string | null;
    isDialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { deleteMutation } = useRecordMutation();

    const handleDeleteConfirmation = async () => {
        if (!recordToDelete) return;

        try {
            deleteMutation({ recordId: recordToDelete });
            setDialogOpen(false);
            toaster.create({ title: "삭제했습니다.", type: "success" });
            setTimeout(() => {
                navigateTo("/");
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toaster.create({ title: "실패했습니다.", type: "error" });
        }
    };

    return (
        <DialogRoot
            open={isDialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
        >
            <Toaster />
            <DialogContent padding={4} position="fixed" left="500px">
                <Text>정말 삭제하시겠습니까?</Text>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            취소
                        </Button>
                    </DialogActionTrigger>
                    <Button
                        colorScheme="red"
                        onClick={handleDeleteConfirmation}
                    >
                        삭제
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};
