const express=require('express');
const cors=require('cors')
const env=require('./config/env')

const healthRoutes=require('./routes/health.routes')

const app=express();

app.use(express.json());
app.use(cors({
    origin:env.cors_origin,
    credentials:true
}));

app.use('/api/health',healthRoutes);

module.exports=app;