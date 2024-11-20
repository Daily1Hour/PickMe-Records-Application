import { Pagination } from "../shared/chakra-ui/pagination";
import { Field } from "../shared/chakra-ui/recordBox"
import { Stack, Heading, Button, Input } from "@chakra-ui/react";

function Record() {
    return (
        <><div>내 기록</div>
            <Stack>                    
                <Field
                    label="회사이름"
                    required>
                    <Input/>
                </Field>
                <Field
                    label="면접 유형">
                    <Input/>
                </Field>
                <Field
                    label="면접 질문">
                    <Input/>
                </Field>
                <Button>등록</Button>
            </Stack>

        <Pagination />
        </>
    );
  };
  
  export default Record;