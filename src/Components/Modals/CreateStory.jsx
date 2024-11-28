import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

const CreateStory = ({ open, toggleOpen, GetStories, storyId }) => {
  const [tag, setTag] = useState("");

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

  const HandleTags = (e) => {
    setParams({ ...params, tags: [...params.tags, ...[tag]] });
    setTag("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storyId
      ? axiosInstance
          .patch(`/stories/${storyId}`, params)
          .then((res) => {
            alert("story updated");
            GetStories();
            toggleOpen();
          })
          .catch((err) => {
            console.log("err:", err);
          })
      : axiosInstance
          .post("/stories", params)
          .then((res) => {
            // GetStories(res.data.stories);
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {
            setParams(fields);
            toggleOpen();
            GetStories();
          });
  };

  const getStoryByID = () => {
    axiosInstance
      .get(`/stories/${storyId}`)
      .then((res) => {
        console.log("res:", res?.data.story);
        setParams({
          ...params,
          title: res?.data?.story?.title,
          description: res?.data?.story?.description,
          tags: res?.data?.story?.tags,
        });
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    storyId && open && getStoryByID();
  }, [storyId]);
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0  flex items-center justify-center  m-auto  w-full h-screen ${
        open ? " z-[999] bg-black-50 backdrop-blur-xl" : "-z-[999]"
      }`}
    >
      {open ? (
        <div className=" bg-white  rounded-xl shadow-2xl  p-6 space-y-6 overflow-auto w-11/12 h-[90vh] ">
          <div className="flex items-center justify-between ">
            <h2 className="text-2xl">Write Your Story</h2>

            <button onClick={toggleOpen} className="">
              X
            </button>
          </div>

          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="bg-transparent border text-black w-full py-4 border-slate-600"
            value={params?.title}
            onChange={handleChange}
          />

          <textarea
            className="w-full h-[50%] bg-transparent border border-slate-600 font-normal text-black "
            placeholder="Write your interesting story and attract people towards you..."
            name="description"
            value={params?.description}
            onChange={handleChange}
          />

          <div className="flex  justify-between ">
            <div className="flex  items-center  gap-2 flex-wrap">
              <div className=" space-y-4">
                <input
                  type="text"
                  name="tag"
                  className="bg-transparent border w-full py-4 border-slate-600"
                  placeholder="Enter tag name"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />

                <button onClick={HandleTags}>Add tag</button>
                <div className="flex items-center  gap-2 flex-wrap">
                  {params?.tags?.map((item, index) => {
                    return (
                      <div className="cursor-pointer bg-orange-300 hover:bg-orange-200 rounded-xl text-white  px-2 py-1">
                        #{item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="flex-shrink-0 py-2 px-10"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateStory;
