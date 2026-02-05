import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("fintech aPP running\n");
});
export default app;
//# sourceMappingURL=app.js.map