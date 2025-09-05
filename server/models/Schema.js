import mongoose from "mongoose";
import youtubedl from "youtube-dl-exec";
import fs from "fs";
import ffmpegPath from "ffmpeg-static";

const Schema = new mongoose.Schema({
  name: String,
  currentLink: String,
  History: { type: [String] },
  created_at: { type: Date },
  latest_use: {
    type: Date,
    default: Date.now,
  },
});

Schema.methods.Downloader = async function (currentLink) {
  if (!fs.existsSync("./downloads")) {
    fs.mkdirSync("./downloads");
  }
  const download = await youtubedl.exec(currentLink, {
    format: "bestvideo+bestaudio",
    output: "./downloads/%(title)s.%(ext)s",
    mergeOutputFormat: "mp4", 
    ffmpegLocation: ffmpegPath, 
    postprocessorArgs: ["-c:v copy -c:a aac"],
  });
  if (!download) {
    throw new Error("Downloading failed");
  }
  (this.currentLink = currentLink), this.History.push(currentLink);
  this.latest_use = new Date();
  await this.save();
  return {
    message: "Download started",
    savedTo: "./downloads/", 
    logs: download,
  };
};

export const DownloadSchema = mongoose.model("Download", Schema);
