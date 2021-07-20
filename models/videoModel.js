const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    videoTitle: {
        type: String,
        required: true
    },
    videoDescription: {
        type: String,
        required: true
    },
    videoPublishedTime:{
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    videoThumbnail: {
        type: String,
        required: true
    },
    videoViewCount: {
        type: String,
        required: true
    },
    videoLikes: {
        type: String,
        required: true
    },
    videoDislike: {
        type: String,
        required: true
    },
    channelTitle: {
        type: String,
        required: true
    },
    channelDescription: {
        type: String,
        required: true
    },
    channelThumbnail: {
        type: String,
        required: true
    },
    channelSubscribers: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Video", videoSchema);