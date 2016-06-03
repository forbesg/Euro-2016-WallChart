(function () {
  'use strict';
  angular.module('App')
    .factory('localStorageFactory', ['$http', '$q', 'thirdPlaceFactory', function ($http, $q, thirdPlaceFactory) {
      return {
        /** Check whether Local Storage is Populated  **/
        checkLocalStorage: function (cb) {
          function createGroups (teamsData) {
            var groups = {
              "Group A": {
                group: [],
                gamesPlayed: 0
              },
              "Group B": {
                group: [],
                gamesPlayed: 0
              },
              "Group C": {
                group: [],
                gamesPlayed: 0
              },
              "Group D": {
                group: [],
                gamesPlayed: 0
              },
              "Group E": {
                group: [],
                gamesPlayed: 0
              },
              "Group F": {
                group: [],
                gamesPlayed: 0
              }
            };

            /** Create updated groups object using teams data **/
            teamsData.teams.forEach(function (item) {
              var groupName = "Group " + item.group;
              groups[groupName].group.push(item);
              groups[groupName].gamesPlayed += item.table.played;
            });
            return groups;
          }
          var euroData = {};
          if (localStorage.euroData) {
            if (cb) {
              return cb(this.getLocalStorage());
            }
            return this.getLocalStorage();
          } else {
            var self = this,
                teams = $http.get('data/teams.json'),
                fixtures = $http.get('data/fixtures.json'),
                knockout = $http.get('data/knockout.json');

            $q.all([teams, fixtures, knockout]).then(function (responseArray) {
              responseArray.forEach(function (item, index) {
                console.log(Object.keys(item.data)[0]);
                console.log(item.data);
                euroData[Object.keys(item.data)[0]] = item.data;
              });

              /** Correct timestamp - convert to milliseconds **/
              for (var group in euroData.fixtures.fixtures) {
                euroData.fixtures.fixtures[group].forEach(function (item) {
                  item.date = item.date * 1000;
                });
              }

              /** Use teams data to create groups **/
              euroData.groups = createGroups(euroData.teams);

              /** Add third place Array **/
              euroData.thirdPlaceArray = [];

              /** Store Data in Local Stroage **/
              self.setLocalStorage(euroData);
              if (cb) {
                return cb(euroData);
              }
            }, function (err) {
              console.log(err);
            });
          }
        },

        /** Set local storage data - pass object to method - return saved object to the controller**/
        setLocalStorage: function (data) {
          localStorage.setItem('euroData', JSON.stringify(data));
          return data;
        },

        /** get Euro Data from localstorage - pass branch parameter to return part data**/
        getLocalStorage: function (branch) {
          if (branch) {
            var allData = JSON.parse(localStorage.getItem('euroData'));
            return allData[branch];
          } else {
            return JSON.parse(localStorage.getItem('euroData'));
          }
        },

        updateGroups: function (data) {
          /* Zero out existing games played data | must be a better way */
          for (var grp in data.groups) {
            data.groups[grp].gamesPlayed = 0;
          }
          var completedGroupCount = 0;
          data.teams.teams.forEach(function (item) {
            var groupName = "Group " + item.group,
                thisGroup = data.groups[groupName];
            if (thisGroup.gamesPlayed < 12) {
              thisGroup.group.shift();
              thisGroup.group.push(item);
              thisGroup.gamesPlayed += item.table.played;
            }
            if (thisGroup.gamesPlayed === 12 && !thisGroup.complete) {
              console.log(groupName + " is now complete.", thisGroup.complete);
              thisGroup.complete = true;
              thisGroup.group.sort(function (a, b) {
                if (a.table.points < b.table.points) return 1;
                if (a.table.points > b.table.points) return -1;
                if (a.table.goalsdiff < b.table.goalsdiff) return 1;
                if (a.table.goalsdiff > b.table.goalsdiff) return -1;
                return 0;
              });
              var last16 = data.last16.last16;
              var winnersCode = "" + item.group + "1";
              var runnersUpCode = "" + item.group + "2";
              for (var game in last16) {
                if (last16[game].hometeam === winnersCode) {
                  data.last16.last16[game].hometeam = thisGroup.group[0];
                }
                if (last16[game].hometeam === runnersUpCode) {
                  data.last16.last16[game].hometeam = thisGroup.group[1];
                }
                if (last16[game].awayteam === winnersCode) {
                  data.last16.last16[game].awayteam = thisGroup.group[0];
                }
                if (last16[game].awayteam === runnersUpCode) {
                  data.last16.last16[game].awayteam = thisGroup.group[1];
                }
              }
              data.thirdPlaceArray.push(thisGroup.group[2]);
              console.log(thisGroup.group[0], winnersCode, runnersUpCode);
            }
          });
          if(data.thirdPlaceArray.length === 6) {
            console.log('Group stage complete', 'Fire Third Place function');
            //thirdPlace factory returns array of sorted game:team objects
            var gamesArray = thirdPlaceFactory.allocateGames(data.thirdPlaceArray);

            gamesArray.forEach(function (game) {
              data.last16.last16[game.game].awayteam = game.team;
            });
          }
          this.setLocalStorage(data);
        },

        /** Delete local storage data **/
        removeLocalStorage: function () {
          localStorage.removeItem('euroData');
          console.log('Local Storage has been cleared');
        }

      };
    }])
})();
