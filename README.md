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
 * node liri.js movie-this: Command will call upon the OMDb API to display searched movie title, year the movie was released, IMDb rating, Rotten tomates rating, country in which the movie was produced, language, plot, and cast members. If no movie is entered the default is Big Lebowski. 
 * node liri.js do-what-it says: Prints the Spotify results for "I Want it That Way" which is stored in the random.txt file. 
