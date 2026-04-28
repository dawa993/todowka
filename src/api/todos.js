const URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
    const res = await fetch(`${URL}?_limit=10`);
    return res.json();
};

export const createTodo = async (title) => {
    const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            completed: false
        })
    });
    return res.json();
};

export const toggleTodo = async (id, completed) => {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    return res.json();
};

export const deleteTodo = async (id) => {
    await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
};