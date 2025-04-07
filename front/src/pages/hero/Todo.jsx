import React from "react";

function Todo({ isPending }) {
  return (
    <div className="p-4">
      <div className="flex gap-x-2 items-center">
        <span>Priority:</span>
        <button className="btn w-18 bg-red-500 text-white rounded-4xl h-6"></button>
        <button className="btn w-18 bg-green-500 text-white rounded-4xl h-6"></button>
      </div>
      <div className="mt-4">
        {isPending ? <p>Pending</p> : <p>Completed</p>}
      </div>
    </div>
  );
}

export default Todo;
