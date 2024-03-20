import express from 'express';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import catRoutes from './routes/cats.js';
import soluRoutes from './routes/solutions.js';
import quesRoutes from './routes/questions.js';
import ansRoutes from './routes/answers.js';
import profRoutes from './routes/profiles.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express();

app.use(cookieParser());
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})


app.use(cors(
    {origin:"http://localhost:3000"}
));

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/cats',catRoutes);
app.use('/api/solutions',soluRoutes);
app.use('/api/questions',quesRoutes);
app.use('/api/answers',ansRoutes);
app.use('/api/profile',profRoutes);



app.listen(8080,()=>{
    console.log("server connected")
})