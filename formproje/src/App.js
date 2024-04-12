import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

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

  useEffect (() => {
    fetchTasks();
  },[]);

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

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById} />
    </div>
  );
}

export default App;
