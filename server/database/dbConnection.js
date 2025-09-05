import mongoose from "mongoose"

export const dbConnection =  () => {
    mongoose.connect(process.env.MongoDB_URL,{
        dbName : "youtube_video_downloader"
    }).then(()=>{
        console.log("connected to database ✅");
    }).catch((error)=>{
        console.log("error in connecting to database ❌",error)
    })
}