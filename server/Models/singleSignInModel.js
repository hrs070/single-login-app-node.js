import mongoose from 'mongoose';

const SingleSignInSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userAgent: { type: String, required: true },
    token: { type: String, required: true },
    id: { type: String }
})

const SingleSignInUser = mongoose.model('SingleSignInUser', SingleSignInSchema);

export default SingleSignInUser;