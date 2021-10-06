const {PythonShell} = require ('python-shell');

PythonShell.run('CVRP.py', null, function (err, result) {
  if (err) throw err;
  console.log(result[0]);
});

PythonShell.run('text.py', null, function (err, result) {
    if (err) throw err;
    console.log(result);
  });