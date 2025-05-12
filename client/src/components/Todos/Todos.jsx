import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import styles from './Todo.module.css';
import NavigationButtons from '../NavigationButtons';
import TodoItem from './TodoItem';
import ApiService from '../ApiSevice';

function Todos() {
    const { userData, isInitialized } = useUserContext();
    // const userId = userData.id;
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [completedFilter, setCompletedFilter] = useState('all');
    // const { username } = userData;
    const apiService = new ApiService();

    useEffect(() => {
        if (isInitialized) {
            fetchTodos(userData.username);
        }
    }, [isInitialized]);

    // const fetchTodos = async () => {
    //     try {
    //         const data = await apiService.fetch(`http://localhost:3000/todos/${userData.id}`);
    //         console.log('Fetched todos:', data);
    //         setTodos([data]);
    //     } catch (error) {
    //         console.error('Error fetching todos:', error);
    //     }
    // };
    const fetchTodos = async () => {
    try {
        const data = await apiService.fetch(`http://localhost:3000/todos/user/${userData.id}`);
        console.log('Fetched todos:', data);
        setTodos(data); // אין .todos כי זה כבר מערך
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};


    const handleSort = (criteria) => {
        let sortedTodos = [...todos];
        if (criteria === 'id') {
            sortedTodos.sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }));
        } else if (criteria === 'title') {
            sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'completed') {
            sortedTodos.sort((a, b) => a.completed - b.completed);
        } else if (criteria === 'random') {
            sortedTodos.sort(() => Math.random() - 0.5);
        }
        setTodos(sortedTodos);
    };

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const newTodoObj = {
                userId,
                title: newTodo,
                completed: false
            };

            try {
                const newTodo = await apiService.post('http://localhost:3000/todos', newTodoObj);
                    setTodos([...todos, newTodo]);
                    setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    const sortOptions = [
        { value: '', label: 'Sort by' },
        { value: 'id', label: 'ID' },
        { value: 'title', label: 'Title' },
        { value: 'completed', label: 'Completed' },
        { value: 'random', label: 'Random' },
    ];

    const radioOptions = [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed' },
        { value: 'not completed', label: 'Not Completed' },
    ];

    return (
        <>
            <NavigationButtons />
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.searchAndFilter}>
                        <select
                            className={styles.sort}
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div>
                            <select
                                className={styles.filters}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option value="title">Title</option>
                                <option value="id">Id</option>
                            </select>
                        </div>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Search todos..."
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div className={styles.radioGroup}>
                            {radioOptions.map((option) => (
                                <label key={option.value}>
                                    <input
                                        className={styles.radio}
                                        type="radio"
                                        value={option.value}
                                        checked={completedFilter === option.value}
                                        onChange={() => setCompletedFilter(option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </header>
                <main className={styles.mainContent}>
                    <h1 className={styles.title}>Todo List</h1>
                    <div className={styles.addTodoSection}>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add new todo..."
                            className={styles.newTodoInput}
                        />
                        <button className={styles.addButton} onClick={handleAddTodo}>
                            Add
                        </button>
                    </div>
                    {todos.filter((todo) => {
                        if (searchType === 'id') {
                            return todo.id.toString().includes(filter);
                        } else if (searchType === 'title') {
                            return todo.title.toLowerCase().includes(filter.toLowerCase());
                        }
                        return true;
                    })
                        .filter((todo) => {
                            if (completedFilter === 'completed') {
                                return todo.completed;
                            } else if (completedFilter === 'not completed') {
                                return !todo.completed;
                            }
                            return true;
                        })
                        .map((todo, index) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                                index={index}
                            />
                        ))}
                </main>
            </div>
        </>
    );
}

export default Todos;
