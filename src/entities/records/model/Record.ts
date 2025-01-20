import { Detail } from "./Detail";

export class Record {
    constructor(
        public recordId: string,
        public enterpriseName: string,
        public category: string,
        public createdAt: string,
        public updatedAt: string,
        public details: Detail[],
    ) {}

    static empty() {
        return new Record("", "", "", "", "", []);
    }
}