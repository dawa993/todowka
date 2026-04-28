import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`task-item-today ${todo.completed ? 'completed' : ''}`}>
            <div className="task-info">
                <div className="task-time">
                    {todo.time || '—'}
                </div>

                <div className="task-details">
                    <p>{todo.description}</p>
                    <span></span>
                </div>
            </div>

            <div className="task-actions-today">
                <i
                    className={`fas ${
                        todo.completed
                            ? 'fa-check task-icon-completed'
                            : 'fa-square task-icon-incomplete'
                    }`}
                    onClick={() => onToggle(todo.id)}
                />

                <i
                    className="fas fa-trash-alt delete-task-icon"
                    onClick={() => onDelete(todo.id)}
                />
            </div>
        </div>
    );
}