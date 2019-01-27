// ===============================================================================
// LOAD DATA
// Linking routes to the 'friends.js' avascript data source.
// ===============================================================================

var userDataArray = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // API GET Request to show JSON objects of the userDataArray in 'friends.js'
  app.get("/api/friends", function(req, res) {
    res.json(userDataArray);
  });


  // API POST Request
  app.post("/api/friends", function(req, res) {

    // sets all user's data into a variable
    var user = req.body;

    // converts the strings of scores into integers
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // sets the starting point at index 0 for the loop used to find closest match
    var closestMatch = 0;

    // sets the starting point of min. difference between scores
    var smallestDiff = 51;

    // goes through the scores of each possible match, takes difference (absolute value)
    for(var i = 0; i < userDataArray.length; i++) {
      var userDiff = 0;
      for(var j = 0; j < userDataArray[i].scores.length; j++) {
        var diff = Math.abs(user.scores[j] - userDataArray[i].scores[j]);
        userDiff += diff;
      }

      // then compares the difference with the min. difference. 
      // if the difference is less than the old min. difference value, sets the new closest match until a new min. difference is found
      if(userDiff < smallestDiff) {
        closestMatch = i;
        smallestDiff = userDiff;
      }
    }

    // adds the user to the userDataArray array
    userDataArray.push(user);


    // returns the closest match as part of the post request
    res.json(userDataArray[closestMatch]);
  });
};
