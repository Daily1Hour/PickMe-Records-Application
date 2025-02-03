import { Record } from "@/entities/records/model"
import { create } from "zustand"

type RecordStore = {
    record: Record
    setRecord: (record: Record) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
    record: Record.empty(),
    setRecord: (record) => set({ record })
}))