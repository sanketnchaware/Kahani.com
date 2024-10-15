import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' or 'down'
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const isLoggedIn = false;

  const [profileOptions, setProfileOptions] = useState(false);

  const handleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  const GoogleLogin = () => {
    window.open("http://localhost:3333/auth/google", "_self");
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;

  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

  //     if (currentScrollPos > prevScrollPos) {
  //       setScrollDirection("down");
  //     } else {
  //       setScrollDirection("up");
  //     }

  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPos]);

  return (
    <div
      className={`transition duration-300 ${
        visible ? "" : "-translate-y-full"
      } z-50 fixed top-0 left-0 w-full shadow-md flex items-center justify-between  backdrop-blur-xl text-center  py-3 px-10`}
    >
      <p>Kahani.com</p>
      {isLoggedIn ? (
        <ClickAwayListener onClickAway={handleProfileOptions}>
          <div className="relative cursor-pointer">
            <div onClick={handleProfileOptions} className="flex items-center">
              <p className="h-full">Sanket Chaware</p>
              <img
                src="/assets/icons/downarrow.svg"
                className="w-6 h-6 mt-1"
                alt="downarrow"
              />
            </div>

            <div
              className={` rounded-sm  ${
                profileOptions
                  ? "max-h-40 border opacity-100"
                  : "max-h-0 opacity-0"
              } transition-all ease-in-out duration-300 absolute divide-y-2 top-8  overflow-hidden bg-white right-0 w-40`}
            >
              <p className="flex gap-2 hover:bg-slate-100 items-center  py-3 p-2">
                <img
                  src="/assets/icons/profile.svg"
                  className="w-5 h-5"
                  alt="profile"
                />
                Profile
              </p>
              <p className="flex gap-2 hover:bg-slate-100 items-center py-3 p-2">
                <img
                  src="/assets/icons/logout.svg"
                  className="w-5 h-5"
                  alt="logout"
                />
                Logout
              </p>
            </div>
          </div>
        </ClickAwayListener>
      ) : (
        <button onClick={GoogleLogin}>Login</button>
      )}
    </div>
  );
};

export default Navbar;
