import mongoose from "mongoose";
import youtubedl from "youtube-dl-exec";
import ffmpegPath from "ffmpeg-static";
import os from "os";
import path from "path";

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
  const downloadsPath = path.join(os.homedir(), "Downloads");
  const download = await youtubedl.exec(currentLink, {
    format: "bestvideo+bestaudio",
    output: `${downloadsPath}/%(title)s.%(ext)s`,
    mergeOutputFormat: "mp4",
    ffmpegLocation: ffmpegPath,
    postprocessorArgs: ["-c:v copy -c:a aac"],
    noPlaylist: true, 
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
