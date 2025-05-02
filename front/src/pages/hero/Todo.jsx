import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoCard from "../../components/common/TodoCard";

function Todo({ isPending }) {

  const status = isPending ? "pending" : "completed";
  const [priorityFilter, setPriorityFilter] = useState(null); 

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ["todos", status],
    queryFn: async () => {
      const res = await axios.get(`/api/todo/${status}`);
      return res.data;
    },
  });

  const filteredTodos = priorityFilter ? todos.filter(todo => todo.priority === priorityFilter): todos;

  return (
    <div className="p-4" >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-x-2">
        <span className="text-lg font-medium text-brown">Priority:</span>
        <div className="flex w-full justify-between gap-x-2 md:justify-start">
          <button 
            className={`w-1/2 md:w-24 bg-red-500 text-white rounded-full py-1 text-center font-medium`}
            onClick={() => setPriorityFilter(priorityFilter === 'high' ? null : 'high')}
          >
            High
          </button>
          <button 
            className={`w-1/2 md:w-24 bg-green-500 text-white rounded-full py-1 text-center font-medium`}
            onClick={() => setPriorityFilter(priorityFilter === 'low' ? null : 'low')}
          >
            Low
          </button>
        </div>
      </div>

      {isLoading && <p className="text-white mt-4">Loading...</p>}
      {isError && <p className="text-red-500 mt-4">Error loading todos</p>}
      {!isLoading && !isError && filteredTodos.length === 0 && (
        <p className=" mt-4">No todos found</p>
      )}

      {!isLoading && !isError && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTodos.map((todo) => (
            <div key={todo._id} className="h-[50vh] lg:h-[35vh] ">
            <TodoCard todo={todo} />
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todo;