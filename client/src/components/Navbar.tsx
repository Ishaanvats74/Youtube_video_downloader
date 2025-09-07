import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <header className="flex justify-between p-4 w-full items-center bg-gradient-to-r from-gray-900 via-white/10 to-gray-900">
      <div className="w-2/4 text-4xl">Yt-downloader</div>

      <ul className="flex justify-end gap-20 w-2/4 text-2xl">
        <li className="transition-all duration-200 ease-in-out bg-gray-400/10 hover:bg-gray-600/10 p-2 rounded-2xl hover:cursor-pointer">
          Home
        </li>
        <li className="transition-all duration-200 ease-in-out bg-gray-400/10 hover:bg-gray-600/10 p-2 rounded-2xl hover:cursor-pointer">
          History
        </li>
        <SignedOut>
          <SignInButton>
            <li className="transition-all duration-200 ease-in-out bg-gray-400/10 hover:bg-gray-600/10 p-2 rounded-2xl hover:cursor-pointer">
              Sign-In
            </li>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "40px", height: "40px" },
              },
            }}
          ></UserButton>
        </SignedIn>
      </ul>
    </header>
  );
};

export default Navbar;
