const videosAPi = window.location.href;
const videosList = `${videosAPi}videosList`;
const videosListUpdate = `${videosAPi}videosListUpdate`;
const videoDetails = `${videosAPi}videoDetails/`;
const options = {};

async function fetchVideoList(apiUrl, options) {
    try {
        document.getElementById('reloadButton').disabled = true;
        document.getElementById("videoList").innerHTML = '';
        let response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const videosList = await response.json();
            let videoCards = '';
            for (let i = 0; i < videosList.videos.length; i++) {
                videoCards += `
                <div class="col-lg-3 col-md-4 card-col">
                <div class="card h-100">
                <img src="${videosList.videos[i].videoThumbnail}" class="card-img-top" alt="video-thumbnail">
                <div class="card-body">
                    <h6 class="card-title">${videosList.videos[i].videoTitle}</h6>
                    <a href="/videoDetails/${videosList.videos[i].videoId}"id="${videosList.videos[i].videoId}" class="stretched-link"
                    ></a>
                </div>
                <div class="card-footer">
                <span class="text-muted">${videosList.videos[i].channelTitle}</span>
                <span class="text-muted">&#124;</span>
                <span class="text-muted">${videosList.videos[i].videoPublishedTime}</sapn>
              </div>
                </div>
                </div>`;
            }
            document.getElementById("videoList").innerHTML = videoCards;
            document.getElementById('reloadButton').disabled = false;
        }
    } catch (error) {
        console.log(error);
    }
}

function reloadVideoList() {
    options.method = "PUT";
    fetchVideoList(videosListUpdate, options);
}
