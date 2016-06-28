(function() {
  angular.module('App')
    .factory('knockoutFactory', ['$http', 'localStorageFactory', function ($http, localStorageFactory) {
      var knockoutData = localStorageFactory.getLocalStorage();
      console.log(knockoutData);
      console.log(JSON.parse(localStorage.getItem('euroData')));
      var winningTeam,
          game,
          fixture;
      return {
        getLocalStorage: function () {
          return localStorageFactory.getLocalStorage();
        },
        winner: function (fixture, game, cb) {
          if (fixture.score.hometeam > fixture.score.awayteam) {
            cb(fixture, game, fixture.hometeam);
          }
          if (fixture.score.hometeam < fixture.score.awayteam) {
            cb(fixture, game, fixture.awayteam);
          }
          if (fixture.score.hometeam === fixture.score.awayteam) {
            fixture.penalties = true;
          }
        },

        progressTeam: function (fixture, game, winningTeam) {
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
          },

          penaltyUpdate: function (game, fixture, winningTeam) {
            this.progressTeam (fixture, game, winningTeam);
          },

          cancelPenaltyUpdate: function (fixture) {
            console.log('penalties cancelled!');
            fixture.score.hometeam = undefined;
            fixture.score.awayteam = undefined;
            fixture.penalties = undefined;
            fixture.completed = undefined;
          },

          updateScore: function (game, fixture) {
            if (fixture.score.hometeam && fixture.score.awayteam) {
              if (!isNaN(fixture.score.hometeam) && !isNaN(fixture.score.awayteam)) {

                this.winner(fixture, game, this.progressTeam);
                localStorage.setItem('euroData', JSON.stringify(knockoutData));
              } else {
                fixture.score.hometeam = undefined;
                fixture.score.awayteam = undefined;
                return;
              }
            } else {
              console.log('need both values');
            }
          }

      };
    }]);
})();
