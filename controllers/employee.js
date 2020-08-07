//importing uuid

const { v4: uuidv4 } = require('uuid')

//importing formidable
const formidable = require('formidable');

const fs = require('fs')

//importing firebase
const firebase = require('firebase');
require('firebase/storage')


exports.uploadEmployee =  (req,res) => {


    //creating instance of incoming form to get all values which were passed by user in front end
    
        
        //destructuring values present in fields of form
        const { fname, lname, email, age, gender, designation, experience, imageUrl, imageName } = req.body;

        //checking wether all values are available or not
        // if( !fname || !lname || !email || !age || !gender || !designation ) {
        //     return res.status(400).json({
        //         error: 'Please include all fields'
        //     })
        // } 

        //creating referance to firebase database
        const dbRef = firebase.database().ref('employees')

        //creating object which will be saved in database
        const employeeData = {
            fname: fname,
            lname: lname, 
            email: email,
            age: age,
            gender: gender,
            designation: designation,
            experience: experience,
            imageUrl: imageUrl,
            imageName: imageName
        }

        //pushing above created object at reference of database
        dbRef.push(employeeData, err => {
            if(err){
                //return error if error is present
                return res.status(400).json({
                    error: err
                })
            }

            //if no error is present then return whole object
            return res.json(employeeData);
        })
    
}

exports.deleteEmployee = async (req,res) => {

    //extracting key of employee which is to be deleted
    const { empid } = req.body;

    //creating referance to that employee in db
    const dbRef = firebase.database().ref('employees').child(empid)
    
    //deleting employee present at that referene
    await dbRef.remove()
        .then(() => {
            //if it is deleted successfully then send message of 'SUCCESS'
            return res.json({
                message: "SUCCESS"
            })
        })
        .catch(err => {
            //if any error is occured then return error
            return res.status(400).json({
                error: err
            })
        })

}

exports.updateEmployee = (req,res) => {

        //extracting values from request body which are to be updated with key
        const { fname, lname, email, age, gender, designation, experience, imageUrl, imageName, key } = req.body;

        if( !fname || !lname || !email || !age || !gender || !designation ) {
            return res.status(400).json({
                error: 'Please include all fields'
            })
        } 

        //db reference at that key
        const dbRef = firebase.database().ref('employees').child(key)

        const employeeData = {
            fname,
            lname, 
            email,
            age,
            gender,
            designation,
            experience,
            imageUrl,
            imageName
        }

        //setting data at dbref of 'key' employee
        dbRef.set(employeeData, err => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }

            return res.json(employeeData);
        })
}


exports.getAllemployee = (req,res) => {
    let dbRef = firebase.database().ref('employees');
    
    var temp;
    dbRef.on("value", snapshot => {
        temp = snapshot.val()
        //console.log(temp)
        return res.json(temp)
    })
    //console.log(temp)
}

exports.getEmployeeById = (req,res,next,id) => {
    req.empid = id;
    next();
}

exports.getEmployee = (req,res) => {
    const { empid } = req;
    const dbRef = firebase.database().ref('employees').child(empid);

    dbRef.on('value', snapshot => {
        return res.json(snapshot.val())
    })
}