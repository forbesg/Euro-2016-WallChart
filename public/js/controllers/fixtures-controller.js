(function () {
  'use strict';
  angular.module('App')
    .controller('fixturesController',
    ['$scope',
      'localStorageFactory',
      'groupsFactory',
    function ($scope, localStorageFactory, groupsFactory) {
      var euroData = localStorageFactory.getLocalStorage();
      var knockoutData = euroData;
      var fixtures;
      var rounds = euroData.last16;
      var winningTeam;
      var startDate = 1465588800000;
      var todaysDate = new Date();
      // var todaysDate = new Date(1466258400000);
      // var firstDay = new Date(1465556301000);
      // var todaysDate = firstDay;
      var dayBefore = new Date(1465430410000);
      // var todaysDate = new Date(1467763210000);
      if (todaysDate > 1466726400000) {
        $scope.knockout = true;
      }
      var games = {
        yesterday: [],
        today: [],
        tomorrow: []
      };
      // if (todaysDate >= 1466726400000) {
      if (todaysDate >= 1465430410000) {
        for (var round in rounds) {
          if (rounds.hasOwnProperty(round)) {
            for (var game in rounds[round]) {
              console.log(rounds[round][game]);
              if (rounds[round].hasOwnProperty(game)) {
                var date = new Date(rounds[round][game].date);
                rounds[round][game].group = game;
                console.log(date.getDate(), todaysDate.getDate())
                if (date.getMonth() === todaysDate.getMonth()) {
                  if (date.getDate() === todaysDate.getDate()) {
                    games.today.push(rounds[round][game]);
                  }
                  if (date.getDate() === (todaysDate.getDate() - 1)) {
                    games.yesterday.push(rounds[round][game]);
                  }
                  if (date.getDate() === (todaysDate.getDate() + 1)) {
                    games.tomorrow.push(rounds[round][game]);
                  }
                }
              }
            }
          }
        }
        $scope.updateScore = function (game, fixture) {
          //Exit function if score inputs are not numbers
          game = game || fixture.group;
          function winner (fixture, game, cb) {
            if (fixture.score.hometeam > fixture.score.awayteam) {
              cb(fixture, game, fixture.hometeam);
            }
            if (fixture.score.hometeam < fixture.score.awayteam) {
              cb(fixture, game, fixture.awayteam);
            }
            if (fixture.score.hometeam === fixture.score.awayteam) {
              fixture.penalties = true;
            }
          }

          function progressTeam(fixture, game, winningTeam) {
            console.log(game);
            switch(game) {
              case 'game1':
                knockoutData.last16.quarters.QF1.hometeam = winningTeam;
                fixture.completed = true;
                console.log('fired');
                break;
              case 'game2':
                knockoutData.last16.quarters.QF1.awayteam = winningTeam;
                fixture.completed = true;
                break;
              case 'game3':
                knockoutData.last16.quarters.QF2.hometeam = winningTeam;
                fixture.completed = true;
                break;
              case 'game4':
                knockoutData.last16.quarters.QF2.awayteam = winningTeam;
                fixture.completed = true;
                break;
              case 'game5':
                knockoutData.last16.quarters.QF3.hometeam = winningTeam;
                fixture.completed = true;
                break;
              case 'game6':
                knockoutData.last16.quarters.QF3.awayteam = winningTeam;
                fixture.completed = true;
                console.log('Game 6', fixture);
                break;
              case 'game7':
                knockoutData.last16.quarters.QF4.hometeam = winningTeam;
                fixture.completed = true;
                break;
              case 'game8':
                knockoutData.last16.quarters.QF4.awayteam = winningTeam;
                fixture.completed = true;
                break;
              case 'QF1':
                knockoutData.last16.semis.SF1.hometeam = winningTeam;
                fixture.completed = true;
                break;
              case 'QF2':
                knockoutData.last16.semis.SF1.awayteam = winningTeam;
                fixture.completed = true;
                break;
              case 'QF3':
                knockoutData.last16.semis.SF2.hometeam = winningTeam;
                fixture.completed = true;
                break;2
              case 'QF4':
                knockoutData.last16.semis.SF2.awayteam = winningTeam;
                fixture.completed = true;
                break;
              case 'SF1':
                knockoutData.last16.finals.final.hometeam = winningTeam;
                fixture.completed = true;
                break;
              case 'SF2':
                knockoutData.last16.finals.final.awayteam = winningTeam;
                fixture.completed = true;
                break;
              default:
                console.log('fallen all the way through the switch statement');
                break;
              }
              fixture.penalties = undefined;
              localStorage.setItem('euroData', JSON.stringify(knockoutData));
            }

          if (fixture.score.hometeam && fixture.score.awayteam) {
            if (!isNaN(fixture.score.hometeam) && !isNaN(fixture.score.awayteam)) {
              winner(fixture, game, progressTeam);
            } else {
              fixture.score.hometeam = undefined;
              fixture.score.awayteam = undefined;
              return;
            }
          } else {
            console.log('need both values');
          }
        };
      }

      // Process fixtures if we have not yet reached the knockout stages
      if (todaysDate < 1466726400000) {
        fixtures = euroData.fixtures.fixtures;
        for (var group in fixtures) {
          if (fixtures.hasOwnProperty(group)) {
            fixtures[group].forEach(function (fixture, index) {
              var date = new Date(fixture.date);
              fixture.group = group;
              fixture.index = index;
              if (date.getDate() === todaysDate.getDate()) {
                games.today.push(fixture);
              }
              if (date.getDate() === (todaysDate.getDate() - 1)) {
                games.yesterday.push(fixture);
              }
              if (date.getDate() === (todaysDate.getDate() + 1)) {
                games.tomorrow.push(fixture);
              }
            });
          }
        }
        $scope.updateScore = function (fixture, group, index) {
          //Exit function if score inputs are not numbers
          if (isNaN(fixture.score.hometeam)) {
            this.fixture.score.hometeam = null;
            this.fixture.score.awayteam = null;
            return;
          }
          if (isNaN(fixture.score.awayteam)) {
            this.fixture.score.hometeam = null;
            this.fixture.score.awayteam = null;
            return;
          }

          if (fixture.score.hometeam && fixture.score.awayteam) {
            //localStorageFactory.updateGroups(euroData);
            fixture.completed = true;
            groupsFactory.updateGroup(fixture, fixture.group, fixture.index);
            //$scope.group = JSON.parse(localStorage.euroData).groups[groupName].group;
          } else {
            console.log('Must complete both scores before update function is fired');
          }

        };
      }

      // Handle Penalty pop-up
      $scope.penaltyUpdate = function (game, fixture, winningTeam) {
        progressTeam (fixture, game, winningTeam);
      };
      $scope.cancelPenaltyUpdate = function (fixture) {
        console.log('penalties cancelled!');
        fixture.score.hometeam = undefined;
        fixture.score.awayteam = undefined;
        fixture.penalties = undefined;
        fixture.completed = undefined;
      };


      // If no games on a certain day return null rather than an empty Array
      for (var day in games) {
        if (games[day].length < 1) {
          games[day] = null;
        }
      }

      $scope.countdown = null;
      // Show countdown if more than one day before the tournament start date
      if (todaysDate < dayBefore) {
        var countdown = (startDate - todaysDate) / (1000 * 60 * 60 * 24);
        var daysToGo = Math.round(countdown);
        $scope.countdown = daysToGo;
      }
      $scope.todaysDate = todaysDate;
      $scope.fixtures = games;
    }]);
})();
