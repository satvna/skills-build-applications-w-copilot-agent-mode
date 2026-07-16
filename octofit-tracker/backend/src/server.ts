import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', (_req, res) => {
  res.json({
    baseUrl,
    users: [
      { id: '1', name: 'Maya', email: 'maya@example.com', totalPoints: 1200 },
      { id: '2', name: 'Leo', email: 'leo@example.com', totalPoints: 980 },
    ],
  });
});

app.get('/api/teams/', (_req, res) => {
  res.json({
    baseUrl,
    teams: [
      { id: '1', name: 'Galaxy Runners', totalPoints: 3200 },
      { id: '2', name: 'Peak Performers', totalPoints: 2900 },
    ],
  });
});

app.get('/api/activities/', (_req, res) => {
  res.json({
    baseUrl,
    activities: [
      { id: '1', type: 'run', durationMinutes: 30, points: 120 },
      { id: '2', type: 'strength', durationMinutes: 45, points: 150 },
    ],
  });
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json({
    baseUrl,
    leaderboard: [
      { rank: 1, name: 'Maya', totalPoints: 1200 },
      { rank: 2, name: 'Leo', totalPoints: 980 },
      { rank: 3, name: 'Nia', totalPoints: 920 },
    ],
  });
});

app.get('/api/workouts/', (_req, res) => {
  res.json({
    baseUrl,
    workouts: [
      { id: '1', name: 'Morning Mobility', category: 'mobility', durationMinutes: 20 },
      { id: '2', name: 'HIIT Circuit', category: 'strength', durationMinutes: 30 },
    ],
  });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection unavailable, continuing without database:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
