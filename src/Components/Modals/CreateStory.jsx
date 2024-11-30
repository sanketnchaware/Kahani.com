import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import cross from "../../assets/icons/cross.svg";

const CreateStory = ({
  open,
  toggleOpen,
  GetStories,
  storyId,
  fields,
  params,
  setParams,
  handleChange,
}) => {
  const [tag, setTag] = useState("");

  const HandleTags = (e) => {
    setParams({ ...params, tags: [...params.tags, ...[tag]] });
    setTag("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event); // Trigger form submission
    }
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
            setParams(fields);
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {})
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
        <form
          onSubmit={handleSubmit}
          className=" bg-white  rounded-xl shadow-2xl  p-6 space-y-6 overflow-auto w-11/12 h-[90vh] "
        >
          <div className="flex items-center justify-between ">
            <h2 className="text-2xl">Write Your Story</h2>

            <button
              onClick={() => {
                setParams(fields);
                toggleOpen();
              }}
              className=""
            >
              <img src={cross} alt="cross" />
            </button>
          </div>

          <input
            required
            type="text"
            name="title"
            placeholder="Enter Title"
            className="bg-transparent border text-black w-full py-4 border-slate-600"
            value={params?.title}
            onChange={handleChange}
          />

          <textarea
            required
            className="w-full h-[50%] bg-transparent border border-slate-600 font-normal text-black "
            placeholder="Write your interesting story and attract people towards you..."
            name="description"
            value={params?.description}
            onChange={handleChange}
          />

          <div className="flex  justify-between ">
            <div className="flex  items-center  gap-2 flex-wrap">
              <div className=" space-y-4  ">
                <form
                  onSubmit={HandleTags}
                  className="flex gap-4  items-center w-full"
                >
                  <input
                    type="text"
                    name="tag"
                    required
                    onKeyDown={handleKeyDown}
                    className="bg-transparent text-black border w-full py-4 border-slate-600"
                    placeholder="Enter tag name"
                    value={tag}
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                  />
                  <button className=" text-3xl w-12 bg-nero text-white h-10 border-black border rounded-full  ">
                    +
                  </button>
                </form>
                <div className="flex items-center  gap-2 flex-wrap">
                  {params?.tags?.map((item, index) => {
                    return (
                      <div className="cursor-pointer bg-orange-300 hover:bg-orange-200 rounded-xl text-black  px-2 py-1">
                        #{item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button className="common_button flex-shrink-0 py-2 px-10">
                Post
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateStory;
