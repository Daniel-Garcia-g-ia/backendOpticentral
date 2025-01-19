const mongoose = require('mongoose');

const uri = 'mongodb://danielg1393:Ff0itkw5fmPtboWQ@ac-acm7cbm-shard-00-00.5ftmkqd.mongodb.net:27017,ac-acm7cbm-shard-00-01.5ftmkqd.mongodb.net:27017,ac-acm7cbm-shard-00-02.5ftmkqd.mongodb.net:27017/opticentral?retryWrites=true&w=majority';

mongoose.set('debug', true);

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error:', err));
