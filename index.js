const express = require("express");
const cors = require("cors");
const app = express();
const CircuitBreaker = require("./circuitBreaker");
const RequestFailureSimulator = require("./requestFailureSimulator");

const circuitBreaker = new CircuitBreaker({
    failureThreshold: 5,
    timeout: 5000,
});

app.use(express.json());
app.use(cors("*"));

const simulator = new RequestFailureSimulator();

app.get("/welcome", async (req, res) => {
    try {
        const allItems = await circuitBreaker.execute(() => simulator.findMany());
        res.send(allItems);
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

app.listen(5055, () => {
    console.log("welcomeuser service started on port 5055");
});
