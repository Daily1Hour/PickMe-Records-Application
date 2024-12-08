// import { useFetchRecords } from "./ui/hook/useFetchRecords";
// import { useState } from "react";
// import Sidebar  from "./ui/sidebar";
// import RecordForm from "./ui/recordForm"
// import PDFUploadForm from "./ui/pdfForm" 

// import { Box, HStack, Flex } from "@chakra-ui/react";

// const RecordPage = () => {
//     const enterpriseName = "Example Company";
//     const { records, loading, error } = useFetchRecords(enterpriseName);

//     const [selectedData, setSelectedData] = useState<
//         { company: string; category: string; questions: { question: string; answer: string }[] } | null
//     >(null);

//     const handleMenuSelect = (id: string) => {
//         if (records[id]) {
//             setSelectedData(records[id]);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     const menuItems = Object.entries(records).map(([id, data]) => ({
//         label: `${data.company} | ${data.category}`,
//         id,
//     }));

//     return (
//         <>
//             <Sidebar menuItems={menuItems} onSelect={handleMenuSelect} />
//             <Box minH="100vh" py={10}>
//                 <Flex direction="column" align="center" maxW="800px" mx="auto">
//                     <HStack gap={4}>
//                         <Box w="600px">
//                             <PDFUploadForm />
//                         </Box>
//                         {selectedData && <RecordForm defaultValues={selectedData} />}
//                     </HStack>
//                 </Flex>
//             </Box>
//         </>
//     );
// };

// export default RecordPage;

import RecordForm from "./ui/recordForm";
import { Box, Flex } from "@chakra-ui/react";

const RecordPage = () => {
    return (
        <Box minH="100vh" py={10}>
            <Flex direction="column" align="center" maxW="800px" mx="auto">
                <RecordForm />
            </Flex>
        </Box>
    );
};

export default RecordPage;