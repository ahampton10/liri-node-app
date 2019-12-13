require("dotenv").config();

var keys = require("./keys.js"); 
var axios = require ("axios"); 
var fs = require("fs");
var Spotify = require ("node-spotify-api"); 
var moment = require("moment");


var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var searchResult = process.argv.slice(3).join(" ");


function liriCom(userInput, searchResult) {
    switch (userInput) {
        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "concert-this":
            concertThis();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doThis();
            break;
    };
}
liriCom(userInput, searchResult);

function concertThis() {
    if (!searchResult) {
        searchResult = "Slightly Stoopid"
    };
    axios.get("https://rest.bandsintown.com/artists/" + searchResult + "/events?app_id=codingbootcamp").then(
        function (response) {

            if (!response.data[0]) {
                console.log("No Upcoming Concerts")
                process.exit()
            }
            console.log("Artist: " + response.data[0].artist.name +
                "\nVenue: " + response.data[0].venue.name +
                "\nLocation: " + response.data[0].venue.city + "," + response.data[0].venue.region + "," + response.data[0].venue.country +
                "\nEvent: " + moment(response.data[0].datetime).format("MM/DD/YYYY, hh:00 A"));
       
            });
        
};

function spotifyThisSong() {
    if (!searchResult) {
        searchResult = "Baby Shark"
    }

    spotify.search({ type: 'track', query: searchResult, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name +
            "\nSong: " + data.tracks.items[0].name +
            "\nAlbum: " + data.tracks.items[0].album.name +
            "\nSong Link: " + data.tracks.items[0].external_urls.spotify); 

        });
};


function movieThis() {
    if (!searchResult) {
        searchResult = "Big Lebowski";
    };
  
    axios.get("http://www.omdbapi.com/?t=" + searchResult + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Movie Title: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\Rated: " + response.data.Rated +
                "\nIMDb Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nProduced in: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nCast: " + response.data.Actors);

       
            });
        
    }; 

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split("|");

        for (var i = 0; i < dataArr.length; i++) {
            var dataArrT = dataArr[i].split(",");
            userInput = dataArrT[0];
            searchResult = dataArrT[1];

            liriCom(userInput, searchResult);
        }
    });
}