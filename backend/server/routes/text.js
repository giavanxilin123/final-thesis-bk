const {PythonShell} = require ('python-shell');

PythonShell.run('../optimize_route.py', null, async function (err, result) {
  if (err) throw err;
  console.log(result.map(x => x.split(',').map(x=> parseInt(x))))
});


