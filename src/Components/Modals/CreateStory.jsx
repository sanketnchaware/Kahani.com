import axios from "axios";
import React, { useState } from "react";

const CreateStory = ({ open, toggleOpen, GetStories }) => {
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
    axios
      .post("http://localhost:3333/stories", params)
      .then((res) => {
        setStories(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      })
      .finally(() => {
        toggleOpen();
        GetStories();
      });
  };
  return (
    <div
      className={` flex items-center justify-center  m-auto  w-full h-screen ${
        open
          ? "fixed left-0 right-0 top-0 bottom-0 z-[999] bg-black-50 backdrop-blur-xl"
          : ""
      }`}
    >
      {open ? (
        <div className=" bg-white rounded-xl shadow-2xl  p-6 space-y-6 overflow-auto w-11/12 h-[90vh] ">
          <div className="flex items-center justify-between ">
            <p>Write your story..</p>

            <button onClick={toggleOpen} className="">
              X
            </button>
          </div>

          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={params?.title}
            onChange={handleChange}
          />

          <textarea
            className="w-full h-[70%] font-normal "
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
