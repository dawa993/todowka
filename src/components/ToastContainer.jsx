import React from 'react';
import Toast from './Toast';

export default function ToastContainer({ toasts, removeToast }) {
    return (
        <div id="toastContainer">
            {toasts.map(t => (
                <Toast
                    key={t.id}
                    message={t.message}
                    type={t.type}
                    onClose={() => removeToast(t.id)}
                />
            ))}
        </div>
    );
}