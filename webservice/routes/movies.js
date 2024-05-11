var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
//var apiToken = "22cc91a94b7a8cbc06992f23b5fcd059";

function clean(body){
    let myObj = [];
    for(item of body["results"]){
        let img_url = item["poster_path"];
        let base_url = "https://image.tmdb.org/t/p/";
        let size = "original";
        let full_url = `${base_url}/${size}/${img_url}`;
        let popularity = item["popularity"];
        let vote_average = item["vote_average"];
        let vote_count = item["vote_count"];
        let my_movie = {}
        my_movie["movie_id"] = item["id"];
        my_movie["title"] = item["title"];
        my_movie["poster_image_url"] = full_url;
        my_movie["popularity_summary"] = `Popularity of ${popularity} with an average vote of ${vote_average} across ${vote_count} votes`;
        myObj.push(my_movie);
    }
    return JSON.stringify(myObj);
}

function clean_test(json){
    return typeof(json);
}

router.get('/', function(req, res, next) {
    let title = req.query.title;
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmNjOTFhOTRiN2E4Y2JjMDY5OTJmMjNiNWZjZDA1OSIsInN1YiI6IjY2M2Y5ZTE1MTM0ODQ0NTAzYTIxMGNmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N1UH-LWe3XIVMKR26cK9w6pPKy9f2tdtaxgKu7tWQ20'
        }
      };
    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(clean(json)))
    .catch(err => console.error('error:' + err));
    
})

module.exports = router;