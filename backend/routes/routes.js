const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.js');

//GET, POST, PUT, DELETE
// Base path: http://localhost:3000/employees

//GET API
router.get('/',(req,res) => {
    Employee.find((err, doc) =>{
        if(err){
            console.log('Error in GET Data' + err)
         }else{
               res.send(doc);
         }
    })
});

//GET Single Employee API
router.get('/:id',(req,res) => {

    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err,doc) =>{
            if(err){
                            console.log('Error in GET Employee by id' + err)
                     }else{
                           res.send(doc);
                     }
        })
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }

    
});

//POST API
router.post('/',(req,res) => {
    console.log(req.body);
    let emp = new Employee({
        name: req.body.employeeName,
        position: req.body.employeeDesignation,
        dept: req.body.employeeDepartment
    });



emp.save((err, doc)=> {
     if(err){
        console.log('Error in Post Data' + err)
     }else{
           res.send(doc);
     }
    });
});

//Put API
router.put('/:id',(req,res) => {

    if(ObjectId.isValid(req.params.id)){

        let emp = {
            name: req.body.employeeName,
            position: req.body.employeeDesignation,
            dept: req.body.employeeDepartment
        };

        Employee.findByIdAndUpdate(req.params.id,{$set:emp}, {new:true}, (err,doc) =>{
            if(err){
                            console.log('Error in Update Employee by id' + err)
                     }else{
                           res.send(doc);
                     }
        })
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }

    
});

//Delete API
router.delete('/:id',(req,res) => {

    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id, (err,doc) =>{
            if(err){
                            console.log('Error in Delete Employee by id' + err)
                     }else{
                           res.send(doc);
                     }
        })
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }

    
});

module.exports = router;