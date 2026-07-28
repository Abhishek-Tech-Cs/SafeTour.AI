const mongoose=require('mongoose')
const env=require('./env')

async function connectDB(){
    try {
        await mongoose.connect(env.mongoURI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
} 

module.exports=connectDB