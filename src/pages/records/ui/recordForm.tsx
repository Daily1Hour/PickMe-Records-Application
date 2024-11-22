import { Field } from "../../../shared/chakra-ui/Field";
import { Stack, Heading, Button, Input, HStack } from "@chakra-ui/react";
import QAForm from "./QAForm";
import { useState } from "react";

interface RecordFormData {
    id: number;
    company: string;
    category: string;
}

interface QAData {
    id: number;
    question: string;
    answer: string;
}

function Record() {
    const [forms, setForms] = useState<RecordFormData[]>([
        { id: Date.now(), company: "", category: "" },
    ]); // 기본 폼 하나 추가]);
    const [qaforms, qasetForms] = useState<QAData[]>([
        { id: Date.now(), question: "", answer: "" },
    ]);

    const addForm = () => {
        qasetForms((prevForms) => [
            ...prevForms,
            { id: Date.now(), question: "", answer: "" },
        ]);
    };

    // 폼 데이터 업데이트
    const updateForm = (id: number, field: keyof QAData, value: string) => {
        qasetForms(
            qaforms.map((form) =>
                form.id === id ? { ...form, [field]: value } : form,
            ),
        );
    };

    // 폼 삭제
    const deleteForm = (id: number) => {
        qasetForms(qaforms.filter((form) => form.id !== id));
    };

    const handleInputChange = (
        id: number,
        field: keyof RecordFormData,
        value: string,
    ) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.id === id ? { ...form, [field]: value } : form,
            ),
        );
        qasetForms((prevForms) =>
            prevForms.map((form) =>
                form.id === id ? { ...form, [field]: value } : form,
            ),
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(qaforms, forms);
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
                    }}
                >
                    {forms.map((form) => (
                        <>
                            <Stack key={form.id} gap="10">
                                <Field label="회사이름" required>
                                    <Input
                                        value={form.company}
                                        onChange={(e) =>
                                            handleInputChange(
                                                form.id,
                                                "company",
                                                e.target.value,
                                            )
                                        }
                                        variant="flushed"
                                    />
                                </Field>
                                <Field label="면접유형">
                                    <Input
                                        value={form.category}
                                        onChange={(e) =>
                                            handleInputChange(
                                                form.id,
                                                "category",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="ex)1차 면접"
                                        variant="flushed"
                                    />
                                </Field>
                                <QAForm
                                    forms={qaforms}
                                    onAddForm={addForm}
                                    onUpdateForm={updateForm}
                                    onDeleteForm={deleteForm}
                                />
                            </Stack>
                            <HStack justifyContent="flex-end">
                                <Button
                                    m="20px"
                                    type="submit"
                                    bg="#009A6E"
                                    borderRadius="30px"
                                    w="100px"
                                    onClick={handleSubmit}
                                >
                                    등록
                                </Button>
                            </HStack>
                        </>
                    ))}
                </form>
            </Stack>
        </>
    );
}

export default Record;
