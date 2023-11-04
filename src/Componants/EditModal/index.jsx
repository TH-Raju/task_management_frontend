/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextData } from "../../Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditModal = ({ id, task, refetch }) => {
  //   console.log("tak", task);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { theme } = useContext(ContextData);
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(id);
    fetch(`http://localhost:5000/api/v1/task/update/${data?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.getElementById(id).close();
          toast.success("update successful");
        }
        navigate(`/`);
        reset();
        refetch();
      });
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle text-black">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-black">Update your Task</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="mx-auto mb-0 mt-3 max-w-md space-y-4"
        >
          <div className="hidden">
            <div className="relative">
              <input
                type="text"
                value={task?._id}
                {...register("id", { required: true })}
                className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="text"
                value={task?.userId}
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
                defaultValue={task?.time}
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
                defaultValue={task?.date}
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
                defaultValue={task?.title}
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
                defaultValue={task?.description}
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
              Update
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
  );
};

export default EditModal;
