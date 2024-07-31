import express from 'express'
import cors from 'cors'
import signRouter from './routes/Signing.js';

const app=express();
const port=3000;

app.use(cors())

app.use(express.json());

app.use('/api/v1/user',signRouter)


app.listen(port,()=>{
    console.log(`Application is running at port ${port}`)
})