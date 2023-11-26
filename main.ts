// require('dotenv').config();
// import { LogModel, MongoDatabase } from './data/mongo/index';
// import { Server } from './presentation/server';


// (async() => {
//   main();
// })();


// async function main(){

//   await MongoDatabase.connect({
//     mongoUrl: process.env.MONGO_URL || '',
//     dbName: process.env.MONGO_DB_NAME || '',
//   });


//   const newLog = await LogModel.create({
//     message: "Test message from Mongo",
//     origin: "main.ts",
//     level: "low",
//   });
//   await newLog.save();

//   console.log(newLog);


// //   Server.start();
// }

