import mongoose from 'mongoose'

export const connectDB = async () => {
    try { 
        const conn = await mongoose.connect(process.env.MONGO_URI || '') 
        console.log(`Mongodb connected: ${conn.connection.name}`)
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}