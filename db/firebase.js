const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://expressvet-43228-default-rtdb.firebaseio.com'
});

module.exports={
    admin
}