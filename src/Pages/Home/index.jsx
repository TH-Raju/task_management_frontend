/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../Context";
import Task from "../../Componants/Task";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();

  const { userId, setUserId, theme } = useContext(ContextData);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    fetch(
      "https://task-manage-backend-dh7dvo8tt-th-raju.vercel.app/api/v1/task/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          // console.log(data);
          toast.success("Task Added Successfully.");
          document.getElementById("my_modal_5").close();
          navigate("/");
          reset();
        } else {
          toast.error("Can't added Task");
        }
      });
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="flex justify-between items-baseline">
        <h1 className=" my-10 text-3xl font-bold">Your Tasks</h1>
        <button
          className="btn btn-primary btn-xs text-xs"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          + Add New Task
        </button>
      </div>
      <Task />
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle text-black"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black">Set your Task</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="mx-auto mb-0 mt-3 max-w-md space-y-4"
          >
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={userEmail}
                  {...register("userId", { required: true })}
                  className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div>
              <label
                className={`block ${
                  theme ? "text-black" : "text-white"
                } my-2 font-bold`}
              >
                Time <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  placeholder="Enter Your Email"
                  {...register("time", { required: true })}
                  className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div>
              <label
                className={`block ${
                  theme ? "text-black" : "text-white"
                } my-2 font-bold`}
              >
                Date <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Enter Your Email"
                  {...register("date", { required: true })}
                  className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div>
              <label
                className={`block ${
                  theme ? "text-black" : "text-white"
                } my-2 font-bold`}
              >
                Title <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  {...register("title", { required: true })}
                  className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>
            <div>
              <label
                className={`block ${
                  theme ? "text-black" : "text-white"
                } my-2 font-bold`}
              >
                Description <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  {...register("description", { required: true })}
                  className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                />
              </div>
            </div>

            <div className="flex items-baseline justify-end gap-4">
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
              >
                Create
              </button>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-warning">Close</button>
                </form>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
