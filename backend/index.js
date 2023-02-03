import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import commentRoute from './routes/comment.js'

const app = express();
dotenv.config()

// constants

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const LINK = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.2i5b7i0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

// middlewares

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static("uploads"))


// routes

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(LINK);
        app.listen((PORT), () => {
            console.log('server started')
        })
    } catch (error) {
        console.log(error)
    }
}

start();