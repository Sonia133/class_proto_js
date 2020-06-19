const mysql = require('mysql');
const express = require('express');

const app = express();
const con = mysql.createConnection ({
  host : 'localhost',
  user : 'root',
  password : 'admin',
  database : 'schoolhierarchy'
});

con.connect(() => {
    console.log('Connected!');
});

con.on('error', function(err) {
  console.log("[mysql error]",err);
});

app.get('/updateStudent/:id/:grade', (req, res) => {
  let id = req.params.id;
  let grade = req.params.grade;
  let sql = 'UPDATE student SET grade = ' + grade + 'WHERE id = ' + id;
  let query = con.query(sql, (err, result) => {
    res.send('Grade updated!');
  })
})

app.get('/updateEmployee/:id/:fired', (req, res) => {
  let id = req.params.id;
  let fired = req.params.fired;
  let sql = 'UPDATE teacher SET fire = ' + fired + 'WHERE id = ' + id;
  let query = con.query(sql, (err, result) => {
    res.send('Employee fired!');
  })
})

app.get('/updateProjects/:id/:proj', (req, res) => {
  let id = req.params.id;
  let proj = req.params.proj;
  let sql = 'UPDATE prodean SET nrActiveProjects = ' + proj + 'WHERE id = ' + id;
  let query = con.query(sql, (err, result) => {
    res.send('No projects updated!');
  })
})

app.get('/getStudent/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * from student WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

app.get('/getteacher/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * from teacher WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

app.get('/getdephead/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * from departmenthead WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

app.get('/getadmin/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * from administrator WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

app.get('/getprodean/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * from prodean WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

app.get('/getdean/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  let sql = 'SELECT * FROM dean WHERE id = ' + id;
  let query = con.query(sql, (err, results) => {
    console.log(err, results);
    res.send(results);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000!');
})
