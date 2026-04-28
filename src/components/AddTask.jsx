import React, { useState } from 'react';

export default function AddTask({ onAdd }) {
    const [text, setText] = useState('');

    function handleAdd() {
        if (!text.trim()) return;

        onAdd({
            description: text,
            time: ''
        });

        setText('');
    }

    return (
        <div className="task-creation-form">
            <h4>Новая задача</h4>

            <input
                type="text"
                placeholder="Введите задачу..."
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button className="create-task-btn" onClick={handleAdd}>
                Добавить
            </button>
        </div>
    );
}