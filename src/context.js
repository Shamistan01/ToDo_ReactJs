import React, { useState, useContext, useRef } from "react";

const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(getTasks());
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const refContainer = useRef(null);

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        toggleDone,
        refContainer,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
