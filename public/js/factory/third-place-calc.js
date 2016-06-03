(function () {
  'use strict';
  angular.module('App')
    .factory('thirdPlaceFactory', ['$http', function ($http) {
      var format = {
        "game": ["game7", "game3", "game5", "game2"],
        "ABCD":	["3C", "3D", "3A", "3B"],
        "ABCE": ["3C", "3A", "3B", "3E"],
        "ABCF": ["3C", "3A", "3B", "3F"],
        "ABDE": ["3D", "3A", "3B", "3E"],
        "ABDF": ["3D", "3A", "3B", "3F"],
        "ABEF": ["3E", "3A", "3B", "3F"],
        "ACDE": ["3C", "3D", "3A", "3E"],
        "ACDF": ["3C", "3D", "3A", "3F"],
        "ACEF":	["3C", "3A", "3F", "3E"],
        "ADEF":	["3D", "3A", "3F", "3E"],
        "BCDE":	["3C", "3D", "3B", "3E"],
        "BCDF":	["3C", "3D", "3B", "3F"],
        "BCEF":	["3E", "3C", "3B", "3F"],
        "BDEF":	["3E", "3D", "3B", "3F"],
        "CDEF":	["3C", "3D", "3F", "3E"]
      };

      var sortThirdPlaceTeams = function (teamsArray) {
        teamsArray.sort(function (a, b) {
          if (a.table.points > b.table.points) return -1;
          if (a.table.points < b.table.points) return 1;
          if (a.table.goalsdiff > b.table.goalsdiff) return -1;
          if (a.table.goalsdiff < b.table.goalsdiff) return 1;
          if (a.table.goalsfor > b.table.goalsfor) return -1;
          if (a.table.goalsfor < b.table.goalsfor) return 1;
          if (a.seed > b.seed) return 1;
          if (a.seed < b.seed) return -1;
          return 0;
        });
        return teamsArray;
      };

      return {
        allocateGames: function (thirdPlaceArray) {
          // Sort third place teams by points > goal diff > seed
          var sortedThirdPlaceTeamsArray = sortThirdPlaceTeams(thirdPlaceArray);
          var groupsCombo = [];

          //Get top four of the third place teams
          for (var i = 0; i < 4; i += 1) {
            console.log(sortedThirdPlaceTeamsArray[i].group);
            groupsCombo.push(sortedThirdPlaceTeamsArray[i].group);
          }

          //sort order to be able to compare with format above
          var letters = groupsCombo.sort().join("");
          var games = [];
          var lettersArray = format[letters];

          //find game for each of the four teams and return array of game:team objects to localStorage Factory
          lettersArray.forEach(function (letter, index) {
            thirdPlaceArray.forEach(function (team) {
              if (team.group === letter[1]) {
                games.push({
                  game: format.game[index],
                  team: team
                });
                console.log(team.country + " plays in " + format.game[index]);
              }
            });
          });
          return games;
        }
      }
    }]);

})();
