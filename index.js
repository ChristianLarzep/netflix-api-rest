const express = require( 'express' );
const mongoose = require( 'mongoose' );
const app = express();
const dotenv = require( 'dotenv' );
const authRoute = require( './routes/auth' );
const userRoute = require( './routes/users' );
const movieRoute = require( './routes/movies' );
const listRoute = require( './routes/lists' );

dotenv.config();

async function connectToDB() {
    await mongoose.connect( process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } );
}

connectToDB().then( () => console.log( "DB Connection Succesfull" ) ).catch( err => console.log( err ) );

app.use( express.json() );

app.use( "/api/auth",authRoute );
app.use( "/api/users", userRoute );
app.use( "/api/movies", movieRoute );
app.use( "/api/lists", listRoute );

app.listen(8080, () => {
    console.log( "Backend server is running!" );
} );