import mongoose from 'mongoose';

export const connectDB = () => {
        mongoose.connect( process.env.NEXT_PUBLIC_API_MongodB_Url!  ,{dbName:"chat2task"}).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.log(err);
        });
}