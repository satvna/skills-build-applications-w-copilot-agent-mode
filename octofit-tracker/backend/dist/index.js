import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
async function start() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
}
start().catch((error) => {
    console.error(error);
    process.exit(1);
});
