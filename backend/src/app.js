const express=require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const env=require('./config/env')

const healthRoutes=require('./routes/health.routes')
const authRoutes=require('./routes/auth.routes')
const notFoundRoute=require('./middleware/notFound.middleware')
const errorHandler=require('./middleware/error.middleware')

const app=express();

app.use(express.json());
app.use(cors({
    origin:env.cors_origin,
    credentials:true
}));
app.use(cookieParser())

app.use('/api/health',healthRoutes);
app.use('/api/auth',authRoutes)

app.use(notFoundRoute)
app.use(errorHandler)

module.exports=app;