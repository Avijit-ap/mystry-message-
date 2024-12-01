import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already databse connection exists");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState;
        console.log("New database connection");


    }
    catch (error) {
        console.log("Error in connecting to database");
        process.exit(1);
    }

}
export default dbConnect;