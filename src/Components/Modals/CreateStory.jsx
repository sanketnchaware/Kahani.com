import React from "react";

const CreateStory = ({ open, toggleOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleOpen();
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

          <textarea
            className="w-full h-[70%] font-normal "
            placeholder="Write your interesting story and attract people towards you..."
            name="story"
            id=""
          ></textarea>

          <div className="flex  justify-between ">
            <div className="flex  items-center  gap-2 flex-wrap">
              <div className=" space-y-4">
                <p>Add tags</p>
                <div className="flex items-center  gap-2 flex-wrap">
                  {[...Array(14)].map((item, index) => {
                    return (
                      <div className="cursor-pointer bg-orange-300 hover:bg-orange-200 rounded-xl text-white  px-2 py-1">
                        #tag{index + 1}
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
