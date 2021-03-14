import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    userId: String,
    txnId: [String],
    tokenName: String,
    tokenAmount: String,
    claimed: String,
    claimedToken: Boolean,
    Stakeddate: Date,
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;