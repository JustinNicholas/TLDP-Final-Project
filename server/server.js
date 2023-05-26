const express = require('express');
const dao = require("./mongo-dao.js");
var cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json());

// app.get('/api/employees', function(req, res){
//     dao.findAllEmployees((err, employees) => {
//         if(employees) {
//             res.send(employees);
//         } else {
//             res.statusCode = 500;
//             res.end();
//         }
//     })
// });
app.get('/api/employeespass', function(req, res){
    dao.findAllEmployeesPass((err, employees) => {
        if(employees) {
            res.send(employees);
        } else {
            res.statusCode = 500;
            res.end();
        }
    })
});
//should be post
//this is just to load employee info
app.get('/api/new', function(req, res){
    dao.loadAllEmployees((err, employees) => {
        if(employees) {
            res.send(employees);
        } else {
            res.statusCode = 500;
            res.end();
        }
    })
});

//should be post
// this is just to load log in info
// app.get('/api/password', function(req, res){
//     dao.loadAllEmployeesPasswords((err, employees) => {
//         if(employees) {
//             res.send(employees);
//         } else {
//             res.statusCode = 500;
//             res.end();
//         }
//     })
// });

// app.get('/login', function(req, res){
//     dao.checkUsers((err, userInfo) => {
//         if(userInfo) {
//             res.send(userInfo);
//         } else {
//             res.statusCode = 500;
//             res.end();
//         }
//     })
// });

app.post('/api/login', function(req, res){
    // console.log(req.body);
    dao.checkUsers(req.body, (err, userInfo) => {
        if(userInfo) {
            res.send(userInfo);
        } else {
            res.statusCode = 500;
            res.end();
        }
    })
});

app.get('/api/profile/:id', function(req, res){
    console.log(req.params.id);
    dao.getProfile(req.params.id, (err, profileInfo) => {
        if(profileInfo) {
            res.send(profileInfo);
        } else {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
    })
});

app.put('/api/profile/:id', function(req, res){
    
    let newData = req.body
    console.log("newData", newData);
    dao.updateProfile(req.params.id, newData, (err, profileInfo) => {
        if(profileInfo) {
            res.send(profileInfo);
        } else {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
    })
});

// will get us all employees names
app.get('/api/directory', function(req, res){
    dao.findAllEmployees((err, employees) => {
        if(employees) {
            res.send(employees);
        } else {
            res.statusCode = 500;
            res.end();
        }
    })
});

// will get us an individual employees info
// app.get('/profile/:id', function(req, res){
//     res.send('Hello profile:id');
    // needs to edit name, phone#, job role, work location.
    // needs to return salary for only employee, manager, and hr
// });

// we will use this to edit a users info by managers or hr
// app.put('/profile/:id', function(req, res){
//     res.send('Hello profile:id');
    // needs to edit name, phone#, job role, work location, and salary.
// });

// we can add this if we have time for hr to add employees.
// app.post('/profile', function(req, res){
//     res.send('Hello profile:id');
// });

app.listen(5000, console.log("listening on port 5000"));