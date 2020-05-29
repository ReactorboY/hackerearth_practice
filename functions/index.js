const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebase = require('firebase')
const app  = require('express')()

// initiliaze firebase app
admin.initializeApp()

const firebaseConfig = {
    apiKey: "AIzaSyBFxVqal_a8DseUsT7-7G7fn-ZtNeI6QCk",
    authDomain: "socialme-44d6a.firebaseapp.com",
    databaseURL: "https://socialme-44d6a.firebaseio.com",
    projectId: "socialme-44d6a",
    storageBucket: "socialme-44d6a.appspot.com",
    messagingSenderId: "655354655010",
    appId: "1:655354655010:web:17d3e80226787c698e757b",
    measurementId: "G-TVZTZEC9ZX"
}
firebase.initializeApp(firebaseConfig)

// create firestore instance
let db = admin.firestore()
let auth = firebase.auth()

// helper function for empty 
const iSEmpty = string => {
    if (string.trim() === '') return true
    else return false
}

const isEmail = email => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(emailRegEx)) return true
    else return false
}

// to have one endpoint for both into one use express
app.post('/signup', (req, res) => {
    const {
        email, 
        handle, 
        password,
        confirmPassword
    } = req.body    

    let errors = {}

    // check for empty handle 
    if(iSEmpty(email)) {
        errors.email = 'Must not be Empty'
    } else if (!isEmail(email)) {
        errors.email = 'Must valid email address'
    } 

    if (iSEmpty(password)) errors.password = "Must not be empty"
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords must match'
    if (iSEmpty(handle)) errors.handle = "Must not empty"

    if (Object.keys(errors).length > 0) return res.status(400).json(errors)

    let token, userId
    db.doc(`/users/${handle}`).get()
        .then(doc => {
            if(doc.exists) {
                return res
                        .status(400)
                        .json({handle:"This handle is already taken"})
            } else {
                return auth.createUserWithEmailAndPassword(email, password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                handle,
                email,
                createdAt: new Date().toISOString(),
                userId,
            }
            return db.doc(`/users/${handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({token})
        })
        .catch(err => {
            if (err.code === 'auth/email-already-in-use') res.status(400).json({email: 'Already in use'})
            else return res.status(500).json(err.code)
        })
})


app.get('/screams', (req, res) => {
    db
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = []
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    ...doc.data()})
            })
            return res.json(screams)
        }).catch(err => console.error(err))
})

app.post('/screams', (req, res) => {
    const {
        userHandle,
        body,
        createdAt = new Date().toISOString()
    } = req.body

    db.collection('screams')
        .add({
            userHandle,
            body,
            createdAt
        })
        .then(doc => {
            res.json({
                message: `New Screams created successfully ${doc.id}`
            })
        }).catch(err => {
            res.status(500).json({
                error: "Something went wrong"
            })
            console.error(err)
        })
})

// all in one route using express
exports.api = functions.https.onRequest(app)