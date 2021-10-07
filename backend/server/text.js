const {PythonShell} = require ('python-shell');

PythonShell.run('optimze_route.py', null, function (err, result) {
  if (err) throw err;
  console.log(result[0]);
});

PythonShell.run('text.py', null, function (err, result) {
    if (err) throw err;
    console.log(result);
  });