import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const Download = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [submited, setSubmited] = useState<boolean>(false);
  const [Video_Id, setVideo_Id] = useState<string | null>("");
  const { isSignedIn, user } = useUser();
  const firstname = user?.firstName;
  if (!isSignedIn) {
    navigate("/sign-in");
  }
  const Video_id = (Url: string) => {
    try {
      const url = new URL(Url);
      console.log(url);
      const Video_id = url.searchParams.get("v");
      setVideo_Id(Video_id);
    } catch (error) {
      alert("Invaild Url");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
      setSubmited(true);
      Video_id(link);
      await toast.promise(axios.post("http://localhost:4000/api/start", {
        name: firstname,
        link: link,
      }),{
        pending: "⏳ Loading your Video",
        success: "✅ Link Is Valid",
        error: "❌ Link Is Invalid",
      },
      {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });    
  };

  const handleDownload = async () => {
       await toast.promise(axios.post("http://localhost:4000/api/startDownload", {
        name: firstname,
        link: link,
      }),{
        pending: "⏳ Downloading your video...",
        success: "✅ Video downloaded successfully!",
        error: "❌ Failed to download video",
      },
      {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      }); 
  };
  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
      {/* Input + Submit */}
      <div
        className={`flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center ${
          submited ? "mt-5" : "h-full items-center"
        }`}
      >
        <input
          type="text"
          className="flex-1 bg-white/10 backdrop-blur-2xl p-3 border border-gray-400/30 rounded-2xl text-lg sm:text-xl"
          placeholder="Type Link Here"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:200%_200%] 
          hover:bg-[position:100%_50%] py-3 px-5 rounded-xl font-bold transition-all 
          duration-500 ease-in-out hover:scale-110 cursor-pointer shadow-lg 
          shadow-blue-900/40 hover:shadow-xl"
          onClick={handleSubmit}
          disabled={link === ""}
        >
          Submit
        </button>
      </div>

      {/* Video + Download */}
      {submited && Video_Id && (
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-center w-full mt-6">
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              title="Youtube player"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              allowFullScreen
              src={`https://www.youtube.com/embed/${Video_Id}`}
            ></iframe>
          </div>
          <button
            className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:200%_200%] 
            hover:bg-[position:100%_50%] py-3 px-6 rounded-xl font-bold transition-all 
            duration-500 ease-in-out hover:scale-110 cursor-pointer shadow-lg 
            shadow-blue-900/40 hover:shadow-xl"
            onClick={handleDownload}
          >
            Download Video
          </button>
        </div>
      )}
    </div>

      </>
  );
};

export default Download;
