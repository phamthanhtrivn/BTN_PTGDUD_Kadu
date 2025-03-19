import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    cartData: {
        type: Array, default: []
    },
    address: {
        type: Object, default: {}
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
