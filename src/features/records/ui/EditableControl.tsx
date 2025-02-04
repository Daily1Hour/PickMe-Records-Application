import React from "react";
import { Editable, IconButton } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

const EditableControl: React.FC = () => {
    return (
        <Editable.Control>
            <Editable.EditTrigger asChild>
                <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                </IconButton>
            </Editable.EditTrigger>
            <Editable.CancelTrigger asChild>
                <IconButton variant="outline" size="xs">
                    <LuX />
                </IconButton>
            </Editable.CancelTrigger>
            <Editable.SubmitTrigger asChild>
                <IconButton variant="outline" size="xs">
                    <LuCheck />
                </IconButton>
            </Editable.SubmitTrigger>
        </Editable.Control>
    );
};

export default React.memo(EditableControl);
