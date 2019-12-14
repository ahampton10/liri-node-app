# liri-node-app

## Assignment Overview
In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 

## Results
 This app was designed to produce search results based on the following commands: 
 * node liri.js concert-this: Command will call upon the Bands in Town API to display searched artist/band name, the venue of their next concert, the location, and the date and time of the concert. If no artist is entered the default is information for Slightly Stoopid. 
 
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
 * node liri.js spotify-this-song: Command will call upon the Spotify API to display searched artist, song, album, and Spotify URL. If no song is entered the default is Baby Shark.  

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
 * node liri.js movie-this: Command will call upon the OMDb API to display searched movie title, year the movie was released, IMDb rating, Rotten tomates rating, country in which the movie was produced, language, plot, and cast members. If no movie is entered the default is Big Lebowski. 

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
 * node liri.js do-what-it says: Prints the Spotify results for "I Want it That Way" which is stored in the random.txt file. 


       function doThis() {

        fs.readFile("random.txt", "utf8", function(error, data) {
          if (error) {
            return console.log(error);
          }
            var output = data.split(",");
            for (var i = 0; i < output.length; i++) {
                console.log(output[i]);
            }   
           });
## Link to App
https://drive.google.com/file/d/1N__VfuPScWse5MdfaAxME6opCpWStp6g/view
