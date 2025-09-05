import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { DownloadSchema } from "../models/Schema.js";

export const Start = catchAsyncError(async (req, res, next) => {
  try {
    const { link, name } = req.body;
    if (!link) {
      return next(new ErrorHandler("No Link Provided", 400));
    };

    await  DownloadSchema.create({
      name: name,
      currentLink: link,
      History: [],
      created_at: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "Video Link Saved",
    });
  } catch (error) {
    next(error);
  };
});

export const StartDownload = catchAsyncError(async (req,res,next) => {
    try {
        const { name, Link } = req.body;
         if (!name || !Link) return next(new ErrorHandler("ID and Link required", 400));
        const download = await  DownloadSchema.findOne({name});
        if (!download) return next(new ErrorHandler("Record not found", 404));
        const result = await download.Downloader(Link);
        res.status(200).json({
            success: true,
            currentLink: Link,
            downloadData: result,
        })
        return result;
    } catch (error) {
        next(error);
    }
})
