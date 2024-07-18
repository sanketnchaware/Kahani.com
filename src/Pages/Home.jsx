import React, { useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axios from "axios";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [openCreateStory, setCreateOpenStory] = useState();

  const [stories, setStories] = useState([]);
  const [storyId, SetStoryId] = useState([]);
  console.log("stories:", stories);

  const toggleStoryModal = () => {
    setCreateOpenStory(!openCreateStory);
  };

  const main = useRef(null);

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.to(".leftcontainer", {
  //       scrollTrigger: {
  //         trigger: ".leftcontainer",
  //         start: "top top",
  //         // end: "bottom bottom",
  //         // endTrigger: ".HomemainContainer",
  //         pin: true,
  //         pinSpacing: false,
  //       },
  //     });
  //     gsap.to(".rightcontainer", {
  //       scrollTrigger: {
  //         trigger: ".rightcontainer",
  //         start: "top top",
  //         // end: "bottom bottom",
  //         // endTrigger: ".HomemainContainer",
  //         pin: true,
  //         pinSpacing: false,
  //       },
  //     });
  //   });
  //   return () => ctx.revert();
  // }, []);

  function GetStories() {
    axios
      .get("http://localhost:3333/stories")
      .then((res) => {
        setStories(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }
  function deleteStory(id) {
    axios
      .delete(`http://localhost:3333/stories/${id}`)
      .then((res) => {
        alert("story deleted");
        GetStories();
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  useEffect(() => {
    GetStories();
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
                className="bg-transparent outline-none border-b w-full"
              />
              <button>Search </button>
            </div>

            <div className="flex justify-center">
              <button onClick={toggleStoryModal} className="">
                Do you have your story ?{" "}
              </button>
            </div>
          </div>
          {stories.length > 0 ? (
            <div className="space-y-6">
              {stories?.map((item, index) => {
                return (
                  <div className="space-y-4  bg-nero text-black rounded-xl  p-4  ">
                    <div className="space-x-4">
                      <button
                        onClick={() => {
                          deleteStory(item?.id);
                        }}
                        className=""
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          SetStoryId(item?.id);
                          toggleStoryModal();
                        }}
                        className=""
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-4">
                      <p className="text-white">
                        {index + 1}. {item?.title}
                      </p>
                      <p className="text-white">{item?.description}</p>
                      <div className="flex items-center  gap-2 flex-wrap">
                        {item?.tags?.map((tag, index) => {
                          return (
                            <div className=" bg-orange-200 rounded-xl text-black  px-2 py-1">
                              #{tag}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" flex items-center justify-center w-full h-[40vh] ">
              No Stories Found !
            </div>
          )}
        </div>
        <div className="rightcontainer  p-6 space-y-6 col-span-3 h-full debug">
          My profile
        </div>
      </div>

      <CreateStory
        open={openCreateStory}
        storyId={storyId}
        GetStories={GetStories}
        toggleOpen={toggleStoryModal}
      />
    </>
  );
};

export default Home;
