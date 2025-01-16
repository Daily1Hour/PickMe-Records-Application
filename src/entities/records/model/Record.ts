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

export class Detail {
    constructor(public question: string, public answer: string) {}
}
