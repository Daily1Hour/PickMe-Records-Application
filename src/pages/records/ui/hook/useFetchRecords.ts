import { useState, useEffect } from "react";
import { fetchRecords } from "../../api/recordsApi";

interface RecordData {
    company: string;
    category: string;
    questions: { question: string; answer: string }[];
}

export const useFetchRecords = (enterpriseName: string) => {
    const [records, setRecords] = useState<Record<string, RecordData>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRecords = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchRecords(enterpriseName);
                const formattedData = Object.entries(data).reduce(
                    (acc, [id, record]) => ({
                        ...acc,
                        [id]: {
                            company: record.enterpriseName,
                            category: record.category,
                            questions: record.details.map(detail => ({
                                question: detail.question,
                                answer: detail.answer,
                            })),
                        },
                    }),
                    {} as Record<string, RecordData>
                );
                setRecords(formattedData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch records");
            } finally {
                setLoading(false);
            }
        };

        if (enterpriseName) {
            loadRecords();
        }
    }, [enterpriseName]);

    return { records, loading, error };
};