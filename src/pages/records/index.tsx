import Record from "./ui/recordForm";
import PDFUploadForm from "./ui/pdfForm";
import {
    Box,
    Button,
    Input,
    Text,
    HStack
  } from '@chakra-ui/react';

function RecordPage() {
    return (
        <Box>
            <HStack>
          <PDFUploadForm />
          <Record />
          </HStack>
        </Box>
    );
  };
  
  export default RecordPage;