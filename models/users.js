import mongoose from 'mongoose';

const schema = mongoose.Schema;

const UserSchema = new schema({
    id: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    friends: {
        type: [String],
        default: []
    },
    friendsRequest: {
        type: [String],
        default: []
    }
});

export default mongoose.model('User', UserSchema);