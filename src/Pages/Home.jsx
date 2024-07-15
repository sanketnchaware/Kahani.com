import React, { useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [openCreateStory, setCreateOpenStory] = useState();

  const toggleStoryModal = () => {
    setCreateOpenStory(!openCreateStory);
  };

  const main = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".leftcontainer", {
        scrollTrigger: {
          trigger: ".leftcontainer",
          start: "top top",
          // end: "bottom bottom",
          // endTrigger: ".HomemainContainer",
          pin: true,
          pinSpacing: false,
        },
      });
      gsap.to(".rightcontainer", {
        scrollTrigger: {
          trigger: ".rightcontainer",
          start: "top top",
          // end: "bottom bottom",
          // endTrigger: ".HomemainContainer",
          pin: true,
          pinSpacing: false,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={main}
        className="HomemainContainer  mt-10 col-span-12 min-h-screen grid grid-cols-12"
      >
        <div className="p-6 leftcontainer space-y-6 col-span-3 h-full debug">
          Filter
        </div>
        <div className="middleContainer  space-y-6 p-6 col-span-6 h-full debug">
          <div className="w-full space-y-6 pt-6 ">
            <div className=" flex items-center gap-4">
              <input
                placeholder="Search your favourite story.."
                type="text"
                className="w-full"
              />
              <button>Search </button>
            </div>

            <div className="flex justify-center">
              <button onClick={toggleStoryModal} className="">
                Do you have your story ?{" "}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {[...Array(20)].map((item) => {
              return (
                <div className="text-black  ">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  odit eligendi error commodi cum excepturi obcaecati at ab
                  necessitatibus totam deserunt ex repellendus, quod minima,
                  asperiores ut non nisi. Vero.
                </div>
              );
            })}
          </div>
        </div>
        <div className="rightcontainer  p-6 space-y-6 col-span-3 h-full debug">
          My profile
        </div>
      </div>

      <CreateStory open={openCreateStory} toggleOpen={toggleStoryModal} />
    </>
  );
};

export default Home;
