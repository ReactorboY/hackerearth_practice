const functions = require('firebase-functions')
const admin = require('firebase-admin')
const app  = require('express')()

// initiliaze firebase app
admin.initializeApp()

// create firestore instance
let db = admin.firestore()

// to have one endpoint for both into one use express

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