/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../Context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const Task = () => {
  const { theme } = useContext(ContextData);
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

  console.log(tasks);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <div
            className={`space-y-4 rounded-lg ${
              theme
                ? "shadow-[4px_-2px_45px_2px_#9ae6b4]"
                : "shadow-[-3px_1px_23px_3px_#9ae6b4]"
            }`}
          >
            <details className="group ">
              <summary className="flex items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">{task.title}</h2>
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
                        Click
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                      >
                        <li>
                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-warning btn-sm mt-3">
                            Delete
                          </button>
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
        </div>
      ))}
    </div>
  );
};

export default Task;
