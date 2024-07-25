const { initializeFirebaseApp, backup } = require('firestore-export-import')

const serviceAccount = require('./service-account.json')
const fs = require('fs');


const firestore = initializeFirebaseApp(serviceAccount)

const collections = ['users', 'metadata', 'teams']

for (let collection of collections) {
  backup(firestore, collection).then((data) => {
    let json = JSON.stringify(data);
    const fileName = `${collection}.json`
    fs.writeFile(`data/${fileName}`, json, (err) => {
      if (err) {
        console.log('Error writing file:', err);
      } else {
        console.log(`Successfully wrote file ${fileName}`);
      }
    });
  })
}
