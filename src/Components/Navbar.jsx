import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' or 'down'
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <div
      className={`transition duration-300 ${
        visible ? "" : "-translate-y-full"
      } z-50 fixed top-0 left-0 w-full bg-orange-500 bg-opacity-20 backdrop-blur-xl text-center debug py-4`}
    >
      Kahani.com
    </div>
  );
};

export default Navbar;
