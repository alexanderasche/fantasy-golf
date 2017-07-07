const express = require('express');
const fs = require('fs');
// const request = require('request');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const jsonfile = require('jsonfile');
const handlebars = require('express-handlebars');

const worldRankingsURL = "http://www.owgr.com/ranking";

const application = express();
const port = 3000;

application.set('view engine', 'handlebars');
application.set('views', './views');
application.engine('handlebars', handlebars());

// request.get(worldRankingsURL, (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     var worldRankingsArray = [];
//     var $ = cheerio.load(html);
//     // Loop Through Players
//     $('tbody tr').each(function(i, element){
//       var player = {};
//       // Grab Player Stats
//       player.ranking = $(this).find('td:first-child').text();
//       player.country = $(this).find('td.ctry img').attr("src");
//       player.name = $(this).find('td.name').text();
//       // Push Player To Array
//       worldRankingsArray.push(player);

//     });
//     // Write To JSON File
//     jsonfile.writeFile('./rankings.json', worldRankingsArray);
//   }
// });

application.get("/", (request, response) => {
  var worldRankings = jsonfile.readFileSync('./rankings.json');
  // Set Brackets
  var tierOne = [];
  var tierTwo = [];
  var tierThree = [];
  var tierFour = [];
  for (i = 0; i < worldRankings.length; i++) {
    if (i < 10) {
      tierOne.push(worldRankings[i]);
    }
    else if (i >= 10 && i < 20) {
      tierTwo.push(worldRankings[i]);
    }
    else if (i >= 20 && i < 40) {
      tierThree.push(worldRankings[i]);
    }
    else {
      tierFour.push(worldRankings[i]);
    }
  }
  playerBrackets = {
    tierOne: tierOne,
    tierTwo: tierTwo,
    tierThree: tierThree,
    tierFour: tierFour
  };
  response.render('home', {players: playerBrackets});
});

application.listen(port, () => {
});