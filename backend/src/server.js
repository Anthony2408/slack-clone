import "../instrument.mjs"
import express from 'express'
import * as Sentry from "@sentry/node";
import { ENV } from './config/env.js'
import { connectDB } from './config/db.js'
import {clerkMiddleware} from '@clerk/express'
import { serve } from "inngest/express";
import { functions, inngest } from './config/inngest.js'
import chatRoutes from './routes/chat.route.js'



const app = express()
app.use(express.json())  //Aloows acces to req.body
app.use(clerkMiddleware()) //req.auth will be available in req object

app.get("/debug-sentry", (req, res) => {
    throw new Error("My first Sentry error");
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app)


const startServer = async () => {
    try {
        await connectDB()
        if(ENV.NODE_ENV !== 'production'){
            app.listen(ENV.PORT, () =>{
            console.log('Server is running on port:', ENV.PORT)
            })
        }
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1); // Exit the process with an error code
    }
}



startServer()

export default app