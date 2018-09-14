require("dotenv").config();

var request = require("request");
var keys = require("./keys");
console.log(keys.spotify.id);

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (command === "concert-this") {
    var artist = process.argv[3];
    var url =  "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" 

    request(url, function(err, res, body) {
        var data = JSON.parse(body);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            console.log(element.venue.name);
            console.log(element.venue.city + "," + element.venue.region);
            console.log(element.datetime );
            console.log("---------------------------------");
        }
    });
         
}

if (command === "spotify-this-song") {
    var songs = process.argv[3];
    
    spotify
    .search({ type: "track", query: songs })
    .then(function(response) {
        console.log("Artist's name: ", response.tracks.items[0].artists[0].name);
        console.log("---------------------------------");
        console.log("A preview link of the song: ", response.tracks.items[0].artists[0].external_urls.spotify);
        console.log("---------------------------------");
        console.log("Song's name: ", response.tracks.items[0].name);
        console.log("---------------------------------");
        console.log("Album: ", response.tracks.items[0].album.name);
        console.log("---------------------------------");

        console.log(songs);
    })

    .catch(function(err) {
    console.log(err);
    });
         
}

if (command === "movie-this") {
    var movies = process.argv[3];

    var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=c9fd86e8&t="+ movies;
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    
    console.log("Title: " + JSON.parse(body).Title); 
    console.log("---------------------------------");
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("---------------------------------");
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("---------------------------------");
    console.log("Country: " + JSON.parse(body).Country);
    console.log("---------------------------------");
    console.log("Language: " + JSON.parse(body).Language);
    console.log("---------------------------------");
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("---------------------------------");
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("---------------------------------");
    
  }
});

}
var fs = require("fs");

fs.writeFile("random.txt", "I Want it That Way", function(spotify) {

if (spotify) {
    return console.log(spotify);
}

console.log("I Want it That Way");

});

