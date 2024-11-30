import React, { useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import axiosInstance from "../utils/axios";
import cross from "../assets/icons/cross.svg";
const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [openCreateStory, setCreateOpenStory] = useState();

  const [stories, setStories] = useState([]);
  const [storyId, SetStoryId] = useState();
  console.log("stories:", stories, storyId);

  const toggleStoryModal = () => {
    setCreateOpenStory(!openCreateStory);
  };

  const fields = {
    title: "",
    description: "",
    tags: [],
  };

  const [params, setParams] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
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
    axiosInstance
      .get("/stories")
      .then((res) => {
        setStories(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }
  function deleteStory(id) {
    axiosInstance
      .delete(`/stories/${id}`)
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
        <div className="p-6 sticky top-12 h-screen lg:block hidden leftcontainer shadow-sameshadow space-y-6 col-span-3">
          Filter
        </div>
        <div className="middleContainer w-full space-y-6 p-6 lg:col-span-6 col-span-12 h-full overflow-y-auto">
          <div className="w-full space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <input
                placeholder="Search your favourite story.."
                type="text"
                className="bg-transparent text-black outline-none border px-4 py-2 rounded-lg w-full"
              />
              <button className="common_button">Search</button>
            </div>

            <div className="flex justify-center gap-4">
              <p className="title4">Do you have your story?</p>
              <button onClick={toggleStoryModal} className="common_button">
                Add 
              </button>
            </div>
          </div>
          {React.Children.toArray(
            stories?.length > 0 ? (
              <div className=" space-y-6">
                {stories?.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-4 shadow-sameshadow text-black rounded-xl p-4"
                  >
                    <div className="flex justify-between">
                      <p className="body2b">
                        {index + 1}. <span className="">{item?.title}</span>
                      </p>
                      <button onClick={() => deleteStory(item?.id)}>
                        <img src={cross} alt="cross" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <p className="body3 font-wendy">{item?.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item?.tags?.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className="bg-gray-200 body3b rounded-xl text-black px-3 py-1"
                          >
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="justify-end flex">
                      <button
                        className="contained_button"
                        onClick={() => {
                          SetStoryId(item?.id);
                          toggleStoryModal();
                        }}
                      >
                        Edit
                      </button>
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
        <div className="shadow-sameshadow  lg:block hidden rightcontainer p-6 space-y-6 col-span-3 sticky top-12 h-screen">
          My profile
        </div>
      </div>

      <CreateStory
        params={params}
        setParams={setParams}
        handleChange={handleChange}
        open={openCreateStory}
        storyId={storyId}
        fields={fields}
        GetStories={GetStories}
        toggleOpen={toggleStoryModal}
      />
    </>
  );
};

export default Home;
