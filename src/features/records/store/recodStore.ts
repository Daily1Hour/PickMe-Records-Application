import { Record } from "@/entities/records/model"
import { create } from "zustand"

type RecordStore = {
    record: Record
}

export const useRecordStore = create<RecordStore>((set) => ({
    record: Record.empty(),
    setRecord: (record: Record) => set({ record })
}))