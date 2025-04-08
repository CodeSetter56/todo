import React from "react";

function Todo({ isPending }) {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-x-2">
        <span className="text-lg font-medium">Priority:</span>
        <div className="flex w-full justify-between gap-x-2 md:justify-start">
          <button className="btn w-1/2 md:w-auto bg-red-500 text-white rounded-4xl h-8">
            High
          </button>
          <button className="btn w-1/2 md:w-auto bg-green-500 text-white rounded-4xl h-8">
            Low
          </button>
        </div>
      </div>

      <div className="mt-4">
        {isPending ? <p>Pending</p> : <p>Completed</p>}
      </div>
    </div>
  );
}

export default Todo;
