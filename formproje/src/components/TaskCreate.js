import {useState} from 'react';
import { useContext } from "react";
import TasksContext from "../context/task";

function TaskCreate({task, taskFormUpdate, onUpdate}) {

    const {editTaskById, createTask} = useContext(TasksContext);
    const [title, setTitle] = useState(task ? task.title : '');
    const [taskDesk, setTaskDesk] = useState(task ? task.taskDesk : '');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleTaskChange = (event) => {
        setTaskDesk(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // bu satır sayfanın tıklama olayında yenilenmesini engellemek için kullanılır.
        if(taskFormUpdate){
            onUpdate(task.id, title, taskDesk);
        }else{
            createTask(title, taskDesk); // App.js de bulunan fonksiyona girilen bilgileri kaydetmek için gönderiyoruz.
        }
        setTitle(''); // bilgiler girildikten sonra enter a tıklanıp bilgileri kaydetme işlemi tamamlandıktan sonra temiz bir input gelmesi için 
        setTaskDesk(''); // bilgiler girildikten sonra enter a tıklanıp bilgileri kaydetme işlemi tamamlandıktan sonra temiz bir textarea gelmesi için 
    }

    return ( 
        <div>
            {taskFormUpdate ? (
                <div className="taskUpdate" >
                <h3>Lütfen taskı düzenleyiniz!</h3>
                <form className="taskForm" onSubmit={handleSubmit} >
                    <label className="task-label" >Başlığı düzenleyiniz</label>
                    <input value={title} onChange={handleChange} type='text' className="task-input" />
                    <label className="task-label" >Taskı düzenleyiniz</label>
                    <textarea value={taskDesk} onChange={handleTaskChange} className="task-input" rows={5} />
                    <button className="task-button update-button" onClick={handleSubmit} >Düzenle</button>
                </form>
            </div>) : 
            <div className="taskCreate" >
            <h3>Lütfen task ekleyiniz!</h3>
            <form className="taskForm" onSubmit={handleSubmit} >
                <label className="task-label" >Başlık</label>
                <input value={title} onChange={handleChange} type='text' className="task-input" />
                <label className="task-label" >Task giriniz</label>
                <textarea value={taskDesk} onChange={handleTaskChange} className="task-input" rows={5} />
                <button className="task-button" onClick={handleSubmit} >Oluştur</button>
            </form>
        </div>
            }
        </div>
        
    );
}

export default TaskCreate;