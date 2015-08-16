var fs = require('fs');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      var path = require('path'); 
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

// @param {results} results is array of filename
walk(__dirname, function(err, results) {
    if (err) throw err;
  
    for (var i = 0; i < results.length; i++) {
        //var path = require('path'); 
        //results[i] = path.normalize(results[i]); // change C:\\Users\\c into C:\Users\c in windows
      
        var data = fs.readFileSync(
            results[i], 
            'utf8'
        )

        var title = /<title>(.*)<\/title>/.exec(data);
        //results[i] = {'title': title[1], 'url': results[i]};
        if (title != null)
            fs.appendFileSync('aabbccdd.txt', '<a href="' + results[i] + '">' + title[1] + '</a>' + '<br>' );
        //results[i] = {'title': title, 'url': results[i]};

        console.log('It\'s saved!');
    }

    //fs.writeFileSync('aabbccdd.txt', JSON.stringify(results));
    //console.log(results);
});
