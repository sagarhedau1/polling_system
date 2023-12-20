const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://sagar348067:L8yjp7vpLmEMnUXy@data.mtgyokb.mongodb.net/?retryWrites=true&w=majority', 
{ 
useNewUrlParser: true,
useUnifiedTopology: true,
}
);

// Store the default connection 
const db = mongoose.connection;

// Listen for any errors that may occur in the database connection 
db.on('error', (error) => {
    console.error('MongoDB connection error!!!!!!!!!', error);
  });

// connection is established,It logs a message to the console showing the successful connection
db.once('open', () => {
    console.log('DATABASE CONNECTED SUCCESSFULLY!!!!! ');
  });

// Export the db object 
module.exports = db;
