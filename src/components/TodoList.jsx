import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
    if (!todos.length) {
        return (
            <div className="no-tasks-message">
                Список задач пуст
            </div>
        );
    }

    return (
        <>
            {todos.map(t => (
                <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
}