const { MongoClient } = require('mongodb');

const uri = 'mongodb://danielg1393:Ff0itkw5fmPtboWQ@ac-acm7cbm-shard-00-00.5ftmkqd.mongodb.net:27017,ac-acm7cbm-shard-00-01.5ftmkqd.mongodb.net:27017,ac-acm7cbm-shard-00-02.5ftmkqd.mongodb.net:27017/opticentral?replicaSet=atlas-jvlh1g-shard-0&w=majority';

const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.close();
  }
}

run();

