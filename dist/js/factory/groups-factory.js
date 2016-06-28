(function() {
  angular.module('App')
    .factory('groupsFactory', ['$http', 'localStorageFactory', function ($http, localStorageFactory) {
      return {
        checkCompletedGroup: function () {
          
        },
        updateGroup: function (fixture, group, index) {
          var euroData = localStorageFactory.getLocalStorage();
          var teams = euroData.teams.teams;
          var fixtures = euroData.fixtures.fixtures;
          fixtures[group][index] = fixture;
          var homeScore = parseInt(fixture.score.hometeam, 10);
          var awayScore = parseInt(fixture.score.awayteam, 10);
          if (homeScore > awayScore) {
            teams.forEach(function (team) {
              if (team.country === fixture.hometeam) {
                team.table.played += 1;
                team.table.won += 1;
                team.table.goalsfor += homeScore;
                team.table.goalsagainst += awayScore;
                team.table.goalsdiff = team.table.goalsfor - team.table.goalsagainst;
                team.table.points += 3;
              }
              if (team.country === fixture.awayteam) {
                team.table.played += 1;
                team.table.lost += 1;
                team.table.goalsfor += awayScore;
                team.table.goalsagainst += homeScore;
                team.table.goalsdiff = team.table.goalsfor - team.table.goalsagainst;
              }
            });
          } else if (homeScore < awayScore) {
            teams.forEach(function (team) {
              if (team.country === fixture.awayteam) {
                team.table.played += 1;
                team.table.won += 1;
                team.table.goalsfor += awayScore;
                team.table.goalsagainst += homeScore;
                team.table.goalsdiff = team.table.goalsfor - team.table.goalsagainst;
                team.table.points += 3;
              }
              if (team.country === fixture.hometeam) {
                team.table.played += 1;
                team.table.lost += 1;
                team.table.goalsfor += homeScore;
                team.table.goalsagainst += awayScore;
                team.table.goalsdiff = team.table.goalsfor - team.table.goalsagainst;
              }
            });
          } else {
            teams.forEach(function (team) {
              if (team.country === fixture.hometeam || team.country === fixture.awayteam) {
                team.table.played += 1;
                team.table.drawn += 1;
                team.table.goalsfor += homeScore; /** The scores (home / away) don't matter as both will be the same **/
                team.table.goalsagainst += awayScore;
                team.table.goalsdiff = team.table.goalsfor - team.table.goalsagainst;
                team.table.points += 1;
              }
            });
          }

          localStorageFactory.updateGroups(euroData);
        }
      }
    }]);
})();
