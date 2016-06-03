(function () {
  'use strict';
  angular.module('App')
    .controller('lastSixteenController', ['$scope', 'localStorageFactory', function ($scope, localStorageFactory) {
      var knockoutData = localStorageFactory.getLocalStorage();
      var winningTeam,
          game,
          fixture;
      console.log(knockoutData)
      $scope.fixtures = knockoutData.last16.last16;
      $scope.quarters = knockoutData.last16.quarters;
      $scope.semis = knockoutData.last16.semis;
      $scope.finals = knockoutData.last16.finals;

      //Calculate winningTeam from fixture score
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
          case 'final':
            console.log('its the final and the winner is ' + winningTeam.country);
            break;
          default:
            console.log('fallen all the way through the switch statement');
            break;
          }
          fixture.penalties = undefined;
          localStorage.setItem('euroData', JSON.stringify(knockoutData));
        }

      // $scope.penaltyUpdate = function (game, fixture, winningTeam) {
      //   knockoutFactory.penaltyUpdate(game, fixture, winningTeam);
      // };
      $scope.penaltyUpdate = function (game, fixture, winningTeam) {
        progressTeam (fixture, game, winningTeam);
      };

      // $scope.cancelPenaltyUpdate = function (fixture) {
      //   knockoutFactory.cancelPenaltyUpdate(fixture);
      // };
      $scope.cancelPenaltyUpdate = function (fixture) {
        console.log('penalties cancelled!');
        fixture.score.hometeam = undefined;
        fixture.score.awayteam = undefined;
        fixture.penalties = undefined;
        fixture.completed = undefined;
      };
      // $scope.updateScore = function (game, fixture) {
      //   knockoutFactory.updateScore(game, fixture);
      // };
      $scope.updateScore = function (game, fixture) {
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
    }]);
})();
