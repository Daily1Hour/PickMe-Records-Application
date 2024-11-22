import React, { useState } from 'react';
import {
  Box,
  VStack,
  Input,
  Text,
} from '@chakra-ui/react';

import { Field } from "../../../shared/chakra-ui/recordBox";

const PDFUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setPdfURL(URL.createObjectURL(file)); // 브라우저에서 PDF 미리보기 URL 생성
      } else {
        alert('Only PDF files are allowed!');
        setSelectedFile(null);
        setPdfURL(null);
      }
    }
  };

  return (
    <Box p={8} borderWidth="1px" borderRadius="md" width="600px">
      <VStack align="stretch">
        <Field label="이력서를 업로드해주세요.">
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
        </Field>
        {selectedFile && (
          <Text>
            Selected File: <strong>{selectedFile.name}</strong>
          </Text>
        )}
        {pdfURL && (
          <Box mt={4} borderWidth="1px" borderRadius="md" overflow="hidden">
            <iframe
              src={pdfURL}
              width="100%"
              height="500px"
              title="PDF Preview"
            ></iframe>
          </Box>
        )}
        {!pdfURL && selectedFile && (
          <Text color="red.500">업로드에 실패하였습니다.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default PDFUploadForm;