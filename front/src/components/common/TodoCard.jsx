import React from "react";

import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoCard({ todo }) {
  const titleColour = todo.priority === "high" ? "text-red-500" : "text-green-500";

  return (
    <div className="h-full bg-base-200 rounded-2xl p-4 flex flex-col">
  <h2 className={`font-bold text-lg ${titleColour}`}>{todo.title}</h2>

  <div className="flex-1 mt-2 flex flex-col lg:flex-row gap-2 min-h-0">
    <div className="flex-1 flex flex-row lg:flex-col min-h-0">
      <div className="flex-1 overflow-auto p-2">
        {todo.text}
      </div>
      <div className="mt-2 flex items-center gap-4 flex-col p-2 lg:flex-row">
        <FaCheck size={"20px"} />
        <FaEdit size={"20px"} />
        <MdDelete size={"20px"} />
      </div>
    </div>

    <div className="flex-1 lg:w-1/3 bg-base-100 flex items-center justify-center">
      img
    </div>
  </div>
</div>

  );
}
export default TodoCard;