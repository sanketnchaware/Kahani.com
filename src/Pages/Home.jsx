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
      .get("https://kahani-com.onrender.com/stories")
      .then((res) => {
        setStories(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }
  function deleteStory(id) {
    axios
      .delete(`https://kahani-com.onrender.com/stories/${id}`)
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
        className="HomemainContainer mt-12 col-span-12 min-h-screen grid grid-cols-12"
      >
        <div className="p-6 sticky top-12 h-screen leftcontainer shadow-sameshadow space-y-6 col-span-3">
          Filter
        </div>
        <div className="middleContainer space-y-6 p-6 col-span-6 h-full overflow-y-auto">
          <div className="w-full space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <input
                placeholder="Search your favourite story.."
                type="text"
                className="bg-transparent text-black outline-none border px-4 py-2 rounded-lg w-full"
              />
              <button>Search</button>
            </div>

            <div className="flex justify-center">
              <button onClick={toggleStoryModal}>
                Do you have your story?
              </button>
            </div>
          </div>
          {React.Children.toArray(
            stories.length > 0 ? (
              <div className=" space-y-6">
                {stories?.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-4 shadow-sameshadow text-black rounded-xl p-4"
                  >
                    <div className="space-x-4">
                      <button onClick={() => deleteStory(item?.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          SetStoryId(item?.id);
                          toggleStoryModal();
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-4">
                      <p>
                        {index + 1}. {item?.title}
                      </p>
                      <p>{item?.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item?.tags?.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className="bg-gray-200 rounded-xl text-black px-3 py-1"
                          >
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-[40vh]">
                No Stories Found!
              </div>
            )
          )}
        </div>
        <div className="shadow-sameshadow rightcontainer p-6 space-y-6 col-span-3 sticky top-12 h-screen">
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
