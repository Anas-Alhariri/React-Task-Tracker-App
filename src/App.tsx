import React, {useEffect, useState} from 'react';
import AddTask from './components/AddTask';
import Header from "./components/Header";
import Tasks from "./components/Tasks";


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    //[
    //         {
    //             "id": 1,
    //             "text": "Doctors Appointment",
    //             "day": "Feb 5th at 2:30pm",
    //             "reminder": true
    //         },
    //         {
    //             "id": 2,
    //             "text": "Meeting at School",
    //             "day": "Feb 6th at 1:30pm",
    //             "reminder": true
    //         },
    //         {
    //             "id": 3,
    //             "text": "Food Shopping",
    //             "day": "Feb 5th at 2:30pm",
    //             "reminder": false
    //         },
    //         {
    //             "id": 4,
    //             "text": "Attend Class",
    //             "day": "March 24th at 8:30 AM",
    //             "reminder": true
    //         },
    //     ]

    // We will use useEffect that will execute something on page loading process:
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetching tasks from our JSON API Server:
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks')
        const data = await response.json()
        return data
    }

    // Fetching a task from our JSON API Server:
    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await response.json()
        return data
    }

    // Add Task using POST:
    const addTask = async (task) => {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json()

        setTasks([...tasks, data])
    }

    // Delete Task:
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,
            {
                method: 'DELETE',
            })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle reminder (UPDATE):
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const response = await fetch(`http://localhost:5000/tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updateTask)
            }
        )

        const data = await response.json()

        setTasks(tasks.map((task) =>
            task.id === id ? {...task, reminder: data.reminder} : task
        ))
    }


    return (
        <div className='container'>
            <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
        </div>
    );
}


export default App;
