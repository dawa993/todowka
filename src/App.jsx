import React, { useEffect, useState } from 'react';
import {
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo
} from './api/todos';

import TodoList from './components/TodoList';
import AddTask from './components/AddTask';
import ToastContainer from './components/ToastContainer';

export default function App() {
    const [todos, setTodos] = useState([]);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getTodos();

        setTodos(
            data.map(t => ({
                id: t.id,
                description: t.title,
                time: '',
                completed: t.completed
            }))
        );
    }

    function showToast(message, type = 'success') {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }

    function removeToast(id) {
        setToasts(prev => prev.filter(t => t.id !== id));
    }

    async function handleAdd(task) {
        const newTodo = await createTodo(task.description);

        setTodos(prev => [
            {
                id: newTodo.id,
                description: newTodo.title,
                time: task.time,
                completed: false
            },
            ...prev
        ]);

        showToast('Задача добавлена!');
    }

    async function handleToggle(id) {
        const t = todos.find(x => x.id === id);
        const updated = await toggleTodo(id, !t.completed);

        setTodos(prev =>
            prev.map(x =>
                x.id === id ? { ...x, completed: updated.completed } : x
            )
        );
    }

    async function handleDelete(id) {
        await deleteTodo(id);
        setTodos(prev => prev.filter(x => x.id !== id));

        showToast('Задача удалена!');
    }

    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="app-container">
            <div className="screen homepage">

                <div className="app-header">
                    <div className="header-left">
                        <i className="fas fa-tasks header-icon"></i>
                        <div className="header-welcome">
                            <p>Добро пожаловать</p>
                        </div>
                    </div>
                </div>

                <h1 className="welcome-message">To Do List</h1>
                <h2 className="main-subtitle">Ваши задачи на сегодня</h2>

                <AddTask onAdd={handleAdd} />

                <div className="progress-summary">
                    <div className="progress-header">
                        <h3>Прогресс</h3>
                        <span className="progress-percentage">{progress}%</span>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar-background">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <p className="tasks-count">
                        {completed} из {total} задач
                    </p>
                </div>

                <h3 className="section-title">Сегодня</h3>

                <div className="task-list-today">
                    <TodoList
                        todos={todos}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                </div>

                <ToastContainer
                    toasts={toasts}
                    removeToast={removeToast}
                />
            </div>
        </div>
    );
}