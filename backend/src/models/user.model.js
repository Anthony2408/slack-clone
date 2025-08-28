import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true }) // Adds created at and updated at fields automatically

export const User = mongoose.model('User', userSchema)
