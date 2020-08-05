const firebase = require('firebase')


//creating signup method and exporting it
exports.signup = (req,res) => {

    //destructuring email and password from request body sent from frontend
    const { password, email } = req.body;

    //creating new user account using given email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(authenticated => {

        const { uid } = authenticated.user
        const dbRef = firebase.database().ref("users")
        dbRef.child(uid).set({
            uid: uid,
            email: email
        }).then(() => {
            //if !errors then return object with credentials
            return res.json(authenticated);
        })
        .catch(err => {
            //if any error occur while saving data then send error
            res.status(400).json({
                error: err
            })
        })
        
    })
    .catch(err => {
        //if error then send error
        return res.status(400).json({
            error: err
        })
    })
}


//creating signin method and exporting it
exports.signin = (req,res) => {

    //destructuring password and email from request body
    const { password, email } = req.body;

    //signin with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(credentials => {
        //if email and password are correct then send user details
        return res.json(credentials);
    })
    .catch(err => {
        //if error then send error
        return res.status(400).json({
            error: err
        })
    })
}


//creating exporting issignedin method to check user is authenticated or not
exports.isSignedIn = (req,res, next) => {

    //currentUser property will return either null or user based on authentication
    const user = firebase.auth().currentUser;
    if(user) {
        //if user is returned by firebase then user is signedin and pass control to next middleware.
        next();
    }
    else{
        //if !user then send error of not signedin
        return res.status(400).json({
            error: "Not signed in"
        })
    }
    
}

exports.signout = (req,res) => {

    //signout with firebase method "signOut"
    firebase.auth().signOut()
    .then(() => {
        //if success then send success: true
        return res.status(200).json({
            success: true
        })
    })
    .catch(err => {
        //if  error then send error
        return res.status(400).json({
            error: err
        })
    })
}