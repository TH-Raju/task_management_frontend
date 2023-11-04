/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ContextData } from "../../Context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import ConfirmModal from "../../Shared/ConfirmModal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EditModal from "../EditModal";

const Task = () => {
  const { theme } = useContext(ContextData);
  const [deleteUser, setDeleteUser] = useState(null);
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const { register, handleSubmit, reset } = useForm();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/task");
      const data = await res.json();
      //   if (data) {
      //     console.log(data);
      //   }
      const filterTask = data.data.filter((task) => task.userId === userEmail);
      return filterTask;
    },
  });

  refetch();
  //   console.log(tasks);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const closeModal = () => {
    setDeleteUser(null);
  };
  const handleDeleteUser = (task) => {
    fetch(`http://localhost:5000/api/v1/task/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Task Deleted successfully");
          refetch();
        }
      });
  };

  const pagi = () => {
    if (end < tasks.length) {
      setStart(start + 5);
      setEnd(end + 5);
      refetch();
    } else {
      setStart(0);
      setEnd(5);
    }
  };

  const pagiBack = () => {
    if (start > 5) {
      setStart(start - 5);
      setEnd(end - 5);
      refetch();
    } else {
      setStart(0);
      setEnd(5);
    }
  };

  return (
    <div>
        <div className="flex justify-end gap-4 mb-2 mr-3 items-center">
        {start > 1 && (
          <button className="btn btn-sm btn-primary" onClick={() => pagiBack()}>
            {"<"}
          </button>
        )}
        <p>
          {start} - {end < tasks.length ? end : tasks.length} ({tasks.length})
        </p>
        <button className="btn btn-sm btn-primary" onClick={() => pagi()}>
          {">"}
        </button>
      </div>
      {tasks.length > 0 ? (
        tasks?.slice(start, end).map((task) => (
          <div key={task._id}>
            <div
              className={`space-y-4 rounded-lg my-5 border border-blue-600 ${
                theme
                  ? "shadow-[4px_-2px_45px_2px_#9ae6b4]"
                  : "shadow-[-3px_1px_23px_3px_#9ae6b4]"
              }`}
            >
              <details className="group ">
                <summary className="flex items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                  <div className="w-[30%] ">
                    <h2 className="font-medium">{task.title}</h2>
                  </div>
                  <h2 className="text-xs">{task.time}</h2>
                  <h2 className="text-xs">{task.date}</h2>

                  <div className="flex gap-3 items-center">
                    <svg
                      className="h-5 w-5 shrink-0 transition duration-300 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>

                    <div className="border border-blue-700 rounded-lg">
                      <div className="dropdown ">
                        <label tabIndex={0} className="btn m-1 btn-xs">
                          option
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                        >
                          <li>
                            <button
                              className="btn btn-primary btn-sm"
                              // onClick={() => handleMakeUser(task._id)}
                              onClick={() =>
                                document.getElementById(task._id).showModal()
                              }
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <label
                              onClick={() => setDeleteUser(task)}
                              htmlFor="confirmation-modal"
                              className="btn bg-red-600 mt-1 hover:bg-red-900 text-white  btn-sm "
                            >
                              Delete
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </summary>

                <p
                  className={` px-4 leading-relaxed pb-4 ${
                    theme ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {task.description}
                </p>
              </details>
            </div>
            <EditModal id={task._id} task={task} refetch={refetch} />
          </div>
        ))
      ) : (
        <>
          <h1 className="text-center font-semibold">
            You Don't have any Task !!!!
          </h1>
        </>
      )}
      {deleteUser && (
        <ConfirmModal
          title={`Are You sure you want to delete?`}
          message={`If You delete ${deleteUser.title}. It cannot be undone.`}
          closeModal={closeModal}
          successButtonName="Delete"
          successAction={handleDeleteUser}
          modalData={deleteUser}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default Task;
