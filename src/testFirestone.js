const admin = require('firebase-admin');
const serviceAccount = require('./beach.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function testFirestore() {
  try {
    const res = await db.collection('test').add({ hello: 'world', timestamp: admin.firestore.Timestamp.now() });
    console.log('Test document added with ID:', res.id);
  } catch (error) {
    console.error('Firestore test error:', error);
  }
}

testFirestore();
