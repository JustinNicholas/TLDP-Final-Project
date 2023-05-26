const mongodb = require('mongodb');
const url = "mongodb://localhost:27017/employees";
const ObjectID = require('mongodb').ObjectID;
let dbPool;

mongodb.MongoClient.connect(url, function (err, db) {
    if (!err) {
      dbPool = db.db("employees");
    } else {
      console.log("DB CONNECTION FAILED. Is database running?");
    }
  });

  module.exports.findAllEmployees = function (callback) {
    var col = dbPool.collection("people");
    col.find().toArray((err, people) => {
      if (!err) {
        callback(null, people);
      } else {
        callback("Failed to find people", undefined);
      }
    });
  };

//   module.exports.findAllEmployeesPass = function (callback) {
//     var col = dbPool.collection("users");
//     col.find().toArray((err, users) => {
//       if (!err) {
//         callback(null, users);
//       } else {
//         callback("Failed to find users", undefined);
//       }
//     });
//   };


  module.exports.checkUsers = function (data, callback) {
    console.log("data:", data);
    var col = dbPool.collection("people");
    col.findOne({"username": data.username, "password": data.password}, function(err, people) {
      if (!err) {
        callback(null, people);
      } else {
        callback("Failed to find people", undefined);
      }
    });
  };

  module.exports.getProfile = function (data, callback) {
    console.log("data:", data);
    var col = dbPool.collection("people");
    col.findOne({"employee_id": data}, function(err, profile) {
      if (!err) {
        callback(null, profile);
      } else {
        console.log(err);
        callback("Failed to find profile", undefined);
      }
    });
  };

  module.exports.updateProfile = async function (id, newData, callback ) {
    console.log("id:", id);
    console.log("newData:", newData);
    var col = dbPool.collection("people");
    //console.log({col});
    const result = await col.updateOne({"_id": ObjectID(id)}, { $set:{ "name": newData.name, "phone_number": newData.phone, "job_role": newData.jobRole, "work_location": newData.location, "salary": newData.salary}}, function(err, profile) {
        if (!err) {
          callback(null, profile);
        } else {
          console.log(err);
          callback("Failed to find profile", undefined);
        }
      });
  };

  //just for loading employee table
//   module.exports.loadAllEmployees = function (callback) {
//     var col = dbPool.collection("people");
//     let newEmployees = [
//         {username: 'Craig123', password: 'password', name: 'Craig', phone_number: '123-456-7890', job_role: 'Manager', work_location: 'St. Paul', salary: '1000000', isManager: 'true', isHr: 'false', manager: '', manager_id: '', employee_id: '123', access_level: '2'},
//         {username: 'Bob123', password: 'password', name: 'Bob', phone_number: '123-456-7890', job_role: 'Manager', work_location: 'St. Paul', salary: '100000', isManager: 'true', isHr: 'false', manager: '', manager_id: '', employee_id: '456', access_level: '2'},
//         {username: 'Angie123', password: 'password', name: 'Angie', phone_number: '123-456-7890', job_role: 'Manager', work_location: 'St. Paul', salary: '10000', isManager: 'treu', isHr: 'false', manager: '', manager_id: '', employee_id: '789', access_level: '2'},
//         {username: 'William123', password: 'password', name: 'William', phone_number: '123-456-7890', job_role: 'HR', work_location: 'Hartford', salary: '110000', isManager: 'false', isHr: 'true', manager: '', manager_id: '', employee_id: '1011', access_level: '3'},
//         {username: 'Chuck123', password: 'password', name: 'Chuck', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'Hartford', salary: '120000', isManager: 'false', isHr: 'false', manager: 'Angie', manager_id: '789', employee_id: '1213', access_level: '1'},
//         {username: 'Amy123', password: 'password', name: 'Amy', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'St. Paul', salary: '150000', isManager: 'false', isHr: 'false', manager: 'Angie', manager_id: '789', employee_id: '1415', access_level: '1'},
//         {username: 'Hannah123', password: 'password', name: 'Hannah', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'Hartford', salary: '90000', isManager: 'false', isHr: 'false', manager: 'Bob', manager_id: '456', employee_id: '1617', access_level: '1'},
//         {username: 'Jake123', password: 'password', name: 'Jake', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'St. Paul', salary: '70000', isManager: 'false', isHr: 'false', manager: 'Bob', manager_id: '456', employee_id: '1819', access_level: '1'},
//         {username: 'Alondra123', password: 'password', name: 'Alondra', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'Hartford', salary: '90000', isManager: 'false', isHr: 'false', manager: 'Craig', manager_id: '123', employee_id: '2021', access_level: '1'},
//         {username: 'Justin123', password: 'password', name: 'Justin', phone_number: '123-456-7890', job_role: 'SWE', work_location: 'St. Paul', salary: '85000', isManager: 'false', isHr: 'false', manager: 'Craig', manager_id: '123', employee_id: '2223', access_level: '1'}
//     ]
//     col.insertMany(newEmployees, function(err, res) {
//       if (!err) {
//         callback(null);
//       } else {
//         callback("Failed to find people", undefined);
//       }
//     });
//   };

//   module.exports.loadAllEmployeesPasswords = function (callback) {
//     var col = dbPool.collection("users");
//     let newEmployees = [
//         {username: 'Craig123', password: 'password', employee_id: '123'},
//         {username: 'Alondra123', password: 'password', employee_id: '456'},
//         {username: 'Ben123', password: 'password', employee_id: '789'},
//         {username: 'William123', password: 'password', employee_id: '1011'},
//         {username: 'Chuck123', password: 'password', employee_id: '1213'},
//         {username: 'Amy123', password: 'password', employee_id: '1415'},
//         {username: 'Hannah123', password: 'password', employee_id: '1617'},
//         {username: 'Jake123', password: 'password', employee_id: '1819'},
//         {username: 'John123', password: 'password', employee_id: '2021'},
//         {username: 'Justin123', password: 'password', employee_id: '2223'}
//     ]
//     col.insertMany(newEmployees, function(err, res) {
//       if (!err) {
//         callback(null);
//       } else {
//         callback("Failed to find people", undefined);
//       }
//     });
//   };