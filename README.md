# webScraping
how to do the youtube web page scraping with the help of youtube trending url


# Youtube Trending Videos Scraper
A NodeJS application to scrap the trending videos from YouTube. 


## Getting Started

Download/Clone the repo and follow the Steps mentioned in the installation part to get started
```sh
$ git clone https://github.com/lokendrajadon/webScraping.git
```

### Prerequisites

* Install NodeJs (14.x)
**https://nodejs.org/en/download/** (windows)
**https://github.com/nodesource/distributions/blob/master/README.md**(Linux)

* Install MongoDB (4.4)
**https://www.mongodb.com/try/download/community** (windows)
**https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/**(Linux)

## Installation & Setup

1. Install package dependencies.
```sh
> cd webScraping
> npm install
```

2.In a separate shell/cmd start MongoDB.
```sh
> mongo (this will open mogno shell or you can use a mongo gui)
> use trendingVideos (this will create a new db) 
> show dbs (list of databases)
```

## Start Node Backend

```sh
> npm start
```

# API Routes

## endpoint to retrieve the popular videos from YouTube: "https://www.youtube.com/feed/trending" and save it to the database.
url:
```
http://localhost:8080/videosListUpdate
```
method:
```
PUT
```

## endpoint to return the videos list from the database.
url:
```
http://localhost:8080/
```
method:
```
GET
```

## endpoint to  return the detail about a single video.
url:
```
http://localhost:8080/videoDetails/AKBF-jeOlD8
```
method:
```
GET

