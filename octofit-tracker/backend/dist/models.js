import mongoose, { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0 },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true, enum: ['run', 'walk', 'strength', 'cycle'] },
    durationMinutes: { type: Number, default: 0 },
    distanceMiles: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
}, { timestamps: true });
export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
