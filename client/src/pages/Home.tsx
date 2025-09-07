import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [submited, setSubmited] = useState<boolean>(false);
  const [Video_Id, setVideo_Id] = useState<string | null>("");
  const { isSignedIn } = useUser();
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

  const handleSubmit = () => {
    console.log("submited");
    setSubmited(true);
    Video_id(link);
  };
  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <Navbar></Navbar>
      <div
        className={`flex justify-center ${
          submited ? "items-start mt-5 " : "items-center "
        }  flex-1 gap-3`}
      >
        <input
          type="text"
          className=" bg-white/10 backdrop-blur-2xl p-3 border border-gray-400/30 rounded-2xl w-96 text-xl"
          name=""
          id=""
          placeholder="Type Link Here"
          required
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] py-3 px-5 rounded-xl font-bold transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer shadow-lg shadow-blue-900/40 hover:shadow-xl "
          onClick={handleSubmit}
          disabled={link == ""}
        >
          Submit
        </button>
      </div>
      {submited && (
        <div className="flex justify-between items-center flex-1">
          <div>
            <iframe
              className="video"
              title="Youtube player"
              height={"500px"}
              width={"800px"}
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://www.youtube.com/embed/${Video_Id}`}
            ></iframe>
          </div>
          <div>
            <button  className="bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] py-3 px-5 rounded-xl font-bold transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer shadow-lg shadow-blue-900/40 hover:shadow-xl ">Download Video </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
