import React, { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            <i
                className={`fas ${
                    type === 'success'
                        ? 'fa-check-circle'
                        : 'fa-times-circle'
                }`}
            />
            {message}
        </div>
    );
}