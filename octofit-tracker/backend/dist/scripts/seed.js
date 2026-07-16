import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const teams = await Team.insertMany([
            { name: 'Galaxy Runners', totalPoints: 3200 },
            { name: 'Peak Performers', totalPoints: 2900 },
        ]);
        const users = await User.insertMany([
            { name: 'Maya Chen', email: 'maya@example.com', teamId: teams[0]._id, totalPoints: 1200 },
            { name: 'Leo Martinez', email: 'leo@example.com', teamId: teams[1]._id, totalPoints: 980 },
            { name: 'Nia Brooks', email: 'nia@example.com', teamId: teams[0]._id, totalPoints: 910 },
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'run', durationMinutes: 35, distanceMiles: 3.2, points: 140, completedAt: new Date('2026-07-10') },
            { userId: users[1]._id, type: 'strength', durationMinutes: 45, distanceMiles: 0, points: 150, completedAt: new Date('2026-07-11') },
            { userId: users[2]._id, type: 'walk', durationMinutes: 60, distanceMiles: 4.1, points: 95, completedAt: new Date('2026-07-12') },
        ]);
        await LeaderboardEntry.insertMany([
            { userId: users[0]._id, name: 'Maya Chen', totalPoints: 1200, rank: 1 },
            { userId: users[1]._id, name: 'Leo Martinez', totalPoints: 980, rank: 2 },
            { userId: users[2]._id, name: 'Nia Brooks', totalPoints: 910, rank: 3 },
        ]);
        await Workout.insertMany([
            { name: 'Morning Mobility', category: 'mobility', durationMinutes: 20, difficulty: 'beginner' },
            { name: 'HIIT Circuit', category: 'strength', durationMinutes: 30, difficulty: 'intermediate' },
            { name: 'Long Distance Run', category: 'endurance', durationMinutes: 45, difficulty: 'advanced' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
