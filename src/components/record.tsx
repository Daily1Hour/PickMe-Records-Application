import { Pagination } from "../shared/chakra-ui/pagination";
import { Field } from "../shared/chakra-ui/recordBox";
import { Stack, Heading, Button, Input, Flex } from "@chakra-ui/react";

function Record() {
    return (
        <>
            <Stack>
                <Heading>내 기록</Heading>
                <form style={{width:"1000px", height:"500px", outline:"auto", outlineColor:"darkgray", padding:'20px'}}>
                    <Stack gap="10">
                        <Field 
                        label="회사이름"
                        required>
                            <Input />
                        </Field>
                        <Field label="면접유형">
                            <Input />
                        </Field>
                        <Field label="면접질문">
                            <Input />
                        </Field>
                    </Stack>
                    <Button
                    m="20px"
                    type="submit"
                    bg="#009A6E">등록</Button>
                </form>
            </Stack>
        </>
    );
}

export default Record;
