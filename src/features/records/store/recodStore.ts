import { create } from "zustand";

import { Record } from "@/entities/records/model";

type RecordStore = {
    record: Record;
    setRecord: (record: Record) => void;
};

export const useRecordStore = create<RecordStore>((set) => ({
    record: Record.empty(),
    setRecord: (record) => set({ record }),
}));
