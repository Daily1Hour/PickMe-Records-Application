import { Pagination } from "../shared/chakra-ui/pagination";
import { Field } from "../shared/chakra-ui/recordBox";
import { Stack, Heading, Button, Input } from "@chakra-ui/react";

function Record() {
    return (
        <>
            <Stack>
                <Heading>내 기록</Heading>
                <Stack>
                    <Field label="회사이름" required>
                        <Input />
                    </Field>
                    <Field label="면접유형">
                        <Input />
                    </Field>
                    <Field label="면접질문">
                        <Input />
                    </Field>
                    <Button>등록</Button>
                </Stack>
            </Stack>

            <Pagination />
        </>
    );
}

export default Record;
