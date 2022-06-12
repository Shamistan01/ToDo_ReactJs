import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import { useGlobalContext } from "./context";

const App = () => {
  const { inputRef, tasks, setTasks, name, setName, filter, setFilter } =
    useGlobalContext();

  const addTask = (e) => {
    e.preventDefault();
    if (name) {
      setName("");
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };
      setTasks([...tasks, newTask]);
    }
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  return (
    <>
      <div className="container">
        <form className="head" onSubmit={addTask}>
          <h1>todos</h1>
          <input
            type="text"
            ref={inputRef}
            placeholder="What needs to be done?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks.length > 0 ? (
            <List />
          ) : (
            <p className="no-tasks">Your list is clear!</p>
          )}
        </DragDropContext>
        <div className="filter">
          <button
            data-filter="all"
            className={filter === "all" ? "active" : ""}
            onClick={filterTasks}
          >
            All
          </button>
          <button
            data-filter="active"
            className={filter === "active" ? "active" : ""}
            onClick={filterTasks}
          >
            Active
          </button>
          <button
            data-filter="completed"
            className={filter === "completed" ? "active" : ""}
            onClick={filterTasks}
          >
            Completed
          </button>
          {tasks.length > 2 && (
            <button
              className="btn-delete-all"
              onClick={deleteAll}
              title="Delete All Tasks (Completed and active)!"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
