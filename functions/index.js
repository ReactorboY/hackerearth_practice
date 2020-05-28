const functions = require('firebase-functions')
const admin = require('firebase-admin')

// initiliaze firebase app
admin.initializeApp()

// create firestore instance
let db = admin.firestore()

exports.getScreams = functions.https.onRequest((req,res ) => {
    db.collection('screams').get()
        .then(data => {
            let screams = []
            data.forEach(doc => {
                screams.push(doc.data())
            })
            return res.json(screams)
        }).catch(err => console.error(err))
});

exports.createScreams =  functions.https.onRequest((req, res) => {
    const {
        userHandle,
        body,
        createdAt = new Date().toISOString()
    } = req.body

    db.collection('screams')
        .add({userHandle,body, createdAt})
        .then(doc => {
            res.json({message: `New Screams created successfully ${doc.id}`})
        }).catch(err =>  console.error(err))
})
