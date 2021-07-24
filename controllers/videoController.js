const axios = require('axios');
const cheerio = require('cheerio');

const youtubeViewUrl = 'https://www.youtube.com/embed/';
const youtubeTrendUrl = 'https://www.youtube.com/feed/trending';
const Video = require("../models/videoModel");


exports.videosList = async (req, res, next) => {
    try {
        const videosList = await Video.find({}).lean();
        res.render('videoList', {
            message: "Videos fetched successfully!",
            videos: videosList
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
};
exports.videoDetails = async (req, res, next) => {
    try {
        const videoDetails = await Video.findOne({
            videoId: req.params.videoId
        }).lean();
        if (videoDetails) {
            res.render('videoDetails', {
                message: "Video Details fetched successfully!",
                video: videoDetails
            })
        } else {
            res.status(400).json({
                message: "Video not found!",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
};


exports.videosListUpdate = async (req, res, next) => {
    try {
        const {
            data
        } = await axios.get(youtubeTrendUrl)

        const $ = cheerio.load(data, {
            xmlMode: false
        });
        const trendData = $('script')[32].children[0].data;
        const trendDataClean = trendData.match(/var ytInitialData = (\{[\s\S]*?\});/);
        const trendDataFiltered = JSON.parse(trendDataClean[1]);
        const trendDataList = trendDataFiltered.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.
            content.sectionListRenderer.contents;
        const videoDetails = [];

// use this to check or remove the items error
        //  for (let i = 0; i < 1; i++) {
            // use this for the original length trending videos
        for (let i = 0; i < trendDataList.length; i++) {
            for (let j = 0; j < trendDataList[i].itemSectionRenderer.contents.length; j++) {
                for (let k = 0; k < trendDataList[i].itemSectionRenderer.contents[j].shelfRenderer.content.expandedShelfContentsRenderer.items.length; k++) {
                    const videoDetailsPath = trendDataList[i].itemSectionRenderer.contents[j].shelfRenderer.content.
                        expandedShelfContentsRenderer.items[k].videoRenderer;
                    let descriptionSnippet;
                    if (videoDetailsPath.hasOwnProperty("descriptionSnippet")) {
                        descriptionSnippet = videoDetailsPath.descriptionSnippet.runs[0].text;
                    } else {
                        descriptionSnippet = "No video description!";
                    }
                    let videoDetailsObj = new VideoDetailsObj(videoDetailsPath.videoId, videoDetailsPath.title.runs[0].text,
                        descriptionSnippet, videoDetailsPath.publishedTimeText.simpleText,
                        `${youtubeViewUrl}${videoDetailsPath.videoId}`, videoDetailsPath.thumbnail.thumbnails[0].url, videoDetailsPath.viewCountText.simpleText,
                        "likes", "dislikes", videoDetailsPath.ownerText.runs[0].text, "channel desc", videoDetailsPath.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
                            .thumbnail.thumbnails[0].url, "subscribers");
                    videoDetails.push(videoDetailsObj);
                }
            }

        }
        const videosList = await Video.find({}).lean();
        if (videosList.length) {
            for (let i = 0; i < videoDetails.length; i++) {
                await Video.updateOne({
                    videoId: videoDetails[i].videoId
                }, videoDetails[i], {
                    upsert: true
                });
            }
        } else {
            await Video.insertMany(videoDetails)
        }
        const videoDetailsList = await Video.find({}).lean();
        // console.log(videoDetailsList)

        res.status(201).json({
            message: "Videos added successfully!",
            videos: videoDetailsList
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
};

// video data prototype
function VideoDetailsObj(videoId, videoTitle, videoDescription, videoPublishedTime, videoUrl, videoThumbnail, videoViewCount,
    videoLikes, videoDislike, channelTitle, channelDescription, channelThumbnail, channelSubscribers) {
    this.videoId = videoId;
    this.videoTitle = videoTitle;
    this.videoDescription = videoDescription;
    this.videoPublishedTime = videoPublishedTime;
    this.videoUrl = videoUrl;
    this.videoThumbnail = videoThumbnail;
    this.videoViewCount = videoViewCount;
    this.videoLikes = videoLikes;
    this.videoDislike = videoDislike;
    this.channelTitle = channelTitle;
    this.channelDescription = channelDescription;
    this.channelThumbnail = channelThumbnail;
    this.channelSubscribers = channelSubscribers;
}