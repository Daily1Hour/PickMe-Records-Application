import Detail from "./Detail";

export default class Record {
    constructor(
        public id: string | null,
        public enterpriseName: string,
        public category: string,
        public createdAt: string,
        public updatedAt: string,
        public details: Detail[],
    ) {}
}
