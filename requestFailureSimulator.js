class RequestFailureSimulator {
    constructor() {
        this.failureCount = 0;
    }

    async findMany() {
        if (this.failureCount < 3) {
            this.failureCount++;
            throw new Error("Simulated error");
        }
        return [{ message: "Success" }];
    }
}

module.exports = RequestFailureSimulator;
