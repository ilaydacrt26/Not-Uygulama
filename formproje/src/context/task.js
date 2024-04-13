import {createContext} from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const TasksContext = createContext();

function Provider({children}){

    const [tasks, setTasks] = useState([]);

  const createTask = async(title, taskDesk) => {

    const response = await axios.post('http://localhost:3001/tasks', {
      title,
      taskDesk
    });

    console.log(response);

    const createdTasks = [
      ...tasks,
      response.data
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  }

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    })
    setTasks(afterDeletingTasks);
};

const editTaskById = async (id, updatedTitle, updatedTaskDesk) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, {
      title: updatedTitle,
      taskDesk: updatedTaskDesk
    });
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return {id, title:updatedTitle, taskDesk: updatedTaskDesk};
      }
      return task;
    });
    setTasks(updatedTasks);
};

const sharedValuesAndMethods = {
    tasks,
    createTask,
    fetchTasks,
    editTaskById,
    deleteTaskById
};

    return (
        <TasksContext.Provider value={sharedValuesAndMethods} >
            {children}
        </TasksContext.Provider>
    )

}

export {Provider}
export default TasksContext;