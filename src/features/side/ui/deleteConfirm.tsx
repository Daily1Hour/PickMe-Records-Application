import {
    DialogRoot,
    DialogContent,
    DialogFooter,
    DialogActionTrigger,
    Button,
    Text,
    DialogCloseTrigger,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteRecord } from "../api/sideApi";

export const DeleteConfirm = ({
    recordToDelete,
    isDialogOpen,
    setDialogOpen,
}: {
    recordToDelete: string | null;
    isDialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteConfirmation = async () => {
        if (!recordToDelete) return;

        setLoading(true);
        setError(null);

        try {
            await deleteRecord(recordToDelete);
            alert("삭제했습니다.");
            setDialogOpen(false);
        } catch (err) {
            setError("Failed to delete the record.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogRoot
            open={isDialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
        >
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
