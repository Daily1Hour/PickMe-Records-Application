import { Field } from "../shared/chakra-ui/recordBox";
import { Stack, Heading, Button, Input } from "@chakra-ui/react";
import QAForm from "../shared/chakra-ui/QAForm";
import { useState } from "react";

interface RecordFormData {
    id: number;
    company: string;
    category: string;
}


function Record() {
    const [forms, setForms] = useState<RecordFormData[]>([]);

    const handleInputChange = (
        id: number,
        field: keyof FormData,
        value: string
      ) => {
        setForms((prevForms) =>
          prevForms.map((form) =>
            form.id === id ? { ...form, [field]: value } : form
          )
        );
      };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(forms)
    };
    
    return (
        <>
            <Stack>
                <Heading>내 기록</Heading>
                <form
                    style={{
                        width: "1000px",
                        height: "500px",
                        padding: "20px",
                    }}>
                    <Stack gap="10">
                        <Field label="회사이름" required>
                            <Input 
                            
                            variant="flushed" />
                        </Field>
                        <Field label="면접유형">
                            <Input
                                placeholder="ex)1차 면접"
                                variant="flushed"
                            />
                        </Field>
                        <QAForm />
                    </Stack>
                    <Button m="20px" type="submit" bg="#009A6E" onClick={handleSubmit}>
                        등록
                    </Button>
                </form>
            </Stack>
        </>
    );
}

export default Record;
