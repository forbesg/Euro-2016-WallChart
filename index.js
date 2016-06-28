var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/dist'));

/*
app.get('/api/v1/teams', function (req, res) {
  var teams = fs.readFileSync(__dirname + '/data/teams.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data.toJSON());
    return data.toJSON();
  });
  res.send(teams);
});

app.get('/api/v1/groups', function (req, res) {
  var groups = {
    "Group A": [],
    "Group B": [],
    "Group C": [],
    "Group D": [],
    "Group E": [],
    "Group F": []
  };
  var teams = fs.readFileSync(__dirname + '/data/teams.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    return data;
  });

  JSON.parse(teams).teams.forEach(function (item) {
    if (item.group === "A") {
      groups['Group A'].push(item);
    };
    if (item.group === "B") {
      groups['Group B'].push(item);
    };
    if (item.group === "C") {
      groups['Group C'].push(item);
    };
    if (item.group === "D") {
      groups['Group D'].push(item);
    };
    if (item.group === "E") {
      groups['Group E'].push(item);
    };
    if (item.group === "F") {
      groups['Group F'].push(item);
    };
  });
  res.send(groups);
});

app.get('/api/v1/fixtures', function (req, res) {

  var fixtures = fs.readFileSync(__dirname + '/data/fixtures.json', 'utf8', function (err, fixtures) {
    if (err) {
      return {error: err};
    } else {
      return data;
    }
  });
  res.send(fixtures);

});
*/

app.listen(3000, function () {
  console.log('serving on port 3000');
})
