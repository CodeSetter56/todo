import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoCard from "../../components/common/TodoCard";
import TodoModal from "../../components/common/TodoModal";

function Todo({ isPending }) {
  const status = isPending ? "pending" : "completed";
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null); 

  const { data: todos = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["todos", status],
    queryFn: async () => {
      const res = await axios.get(`/api/todo/${status}`);
      return res.data;
    },
  });

  const filteredTodos = priorityFilter
    ? todos.filter((todo) => todo.priority === priorityFilter)
    : todos;

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleCloseModal = () => {
    setEditingTodo(null); 
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">Priority:</span>
          <button
            className="bg-red-500 text-white rounded-full px-3 py-1"
            onClick={() =>
              setPriorityFilter(priorityFilter === "high" ? null : "high")
            }
          >
            High
          </button>
          <button
            className="bg-green-500 text-white rounded-full px-3 py-1"
            onClick={() =>
              setPriorityFilter(priorityFilter === "normal" ? null : "normal")
            }
          >
            Normal
          </button>
        </div>
      </div>

      {isLoading && <p className="mt-4 text-white">Loading...</p>}
      {isError && <p className="mt-4 text-red-500">Error loading todos</p>}
      {!isLoading && !isError && filteredTodos.length === 0 && (
        <p className="mt-4">No todos found</p>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => (
          <div key={todo._id} className="h-[50vh] lg:h-[35vh]">
            <TodoCard todo={todo} onEdit={() => handleEdit(todo)} onDelete={refetch} />
          </div>
        ))}
      </div>

      {editingTodo && (
        <TodoModal
          mode="edit"
          initialData={editingTodo} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Todo;
``