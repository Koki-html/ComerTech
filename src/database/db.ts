import * as  dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';

// Loading Enviroment Variables
dotenv.config();

const db_host : string = process.env.DB_HOST || "localhost"; // Default HOST for MongoDB (in local)
const db_port : string = process.env.DB_PORT || "27017" // Default Port of MongoDB
const db_name : string = process.env.MONGO_DB_NAME || "ComerceTech" // Import of the name of the Database for limiting the connection
const database_url = `mongodb://${db_host}:${db_port}/${db_name}`

console.log(database_url);

// an async function becouse we need all the services working at the same time
export async function db_connect() {
    
    // Creating the Connection with a Try, in a exception case it will cancel all and send a error log.
    try{

        // Function to create the Connection
        await mongoose.connect(database_url);
        console.log('Connection established')
        
    // Function to catch the error an print it.
    } catch (error){
        console.error("Error in the connection ");
        throw error
    }
}
