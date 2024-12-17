// import express from 'express';
// import cors from 'cors'
// import connectDb from './config/mongodb.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRoutes.js';
// import dotenv from 'dotenv'

// dotenv.config();
// const PORT=process.env.PORT || 4000;

// const app=express();

// app.use(express.json());
// app.use(cors());


// await connectDb();

// app.use('/api/user',userRouter);
// app.use('/api/image',imageRouter);
// app.get('/',(req,res)=>{
//     res.send("Api Working")
// })


// app.listen(PORT,( )=> console.log(`Server Started at ${PORT}`));



import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDb();

// API Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => {
    res.send("API is Working");
});

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static assets (React build folder)
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    // Serve index.html for all non-API routes (client-side routing)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
