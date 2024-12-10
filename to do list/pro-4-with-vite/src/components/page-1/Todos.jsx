// import { useState } from "react";
// import TodoList from "./TodoList";
// import { v4 as uuidv4 } from 'uuid';

// export default function Todos() {
//   const [todos, setTodos] = useState([
//     { id: uuidv4(), title: "wake up at 8:00", checked: false },
//     { id: uuidv4(), title: "Coding and software development", checked: true }
//   ]);

//   const [newTodoTitle, setNewTodoTitle] = useState("");

//   const onInputNewTodoChangeHandler = (event) => {
//     setNewTodoTitle(event.target.value);
//   };

//   const addNewTodoHandler = (event) => {
//     if (event.key === 'Enter' && newTodoTitle !== "") {
//       setTodos([...todos, {
//         id: uuidv4(),
//         title: newTodoTitle,
//         checked: false,
//       }]);
//       setNewTodoTitle("");  // Reset the input value after adding new todo
//     }
//   };

//   const deleteTodoHandler = (todo) => {
//     const newTodos = todos.filter((item) => todo.id !== item.id);
//     setTodos(newTodos);
//   };

//   const toggleTodoCheckedHandler = (todo) => {
//     const newTodo = todos.map((item) => {
//       if (todo.id === item.id) {
//         item.checked = !item.checked;
//       }
//       return item;
//     });
//     setTodos(newTodo);
//   };

//   const editTodoTitleHandler = (todo, newTitleValue) => {
//     const newTodo = todos.map((item) => {
//       if (todo.id === item.id) {
//         item.title = newTitleValue;
//       }
//       return item;
//     });
//     setTodos(newTodo);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 bg-white">
//         <div className="flex items-center mb-6">
//           <h1 className="mr-6 text-4xl font-bold text-purple-600">TO DO APP</h1>
//         </div>
//         <div className="relative">
//           <input 
//             type="text" 
//             placeholder="What needs to be done today?" 
//             value={newTodoTitle} 
//             onChange={onInputNewTodoChangeHandler} 
//             onKeyDown={addNewTodoHandler} 
//             className="w-full px-2 py-3 border rounded outline-none border-grey-600" 
//           />
//         </div>
//         <TodoList 
//           todos={todos} 
//           deleteTodoHandler={deleteTodoHandler} 
//           toggleTodoCheckedHandler={toggleTodoCheckedHandler} 
//           editTodoTitleHandler={editTodoTitleHandler} 
//         />
//       </div>
//     </div>
//   );
// }



// چرک نویس

// Todos.js


import { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'

export default function Todos() {
    const [todos, setTodos] = useState([
        { id: uuidv4(), title: "wake up at 8:00", checked: false },
        { id: uuidv4(), title: "Coding and software development", checked: true }
    ]);
    const [input, setInput] = useState(""); // حالت برای نگه‌داشتن مقدار ورودی

    const handleCheckboxChange = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = (id) => {
        todos.map((todo) => {
            if (todo.id == id) {
                setInput(todo.title)
                deleteTodo(todo.id)
            }
        })
    }

    const interKey = (event) => {
        if (event.key == "Enter") {
            addToList()
        }
    }

    const addToList = () => {
        if (input.trim() !== "") {
            const newTodo = {
                id: uuidv4(),
                title: input,
                checked: false
            };
            setTodos([...todos, newTodo]);
            setInput(""); // پاک کردن مقدار ورودی بعد از اضافه شدن به لیست
        } if (input.trim() == "") {
            alert("Please write what you want to do in the box.")
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <input
                        name="text"
                        id="text"
                        type="text"
                        placeholder="What needs to be done today?"
                        className="w-full px-2 py-3 border rounded outline-none border-grey-600"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={interKey}
                    />
                    <button onClick={addToList} className="mt-5 ml-2 bg-purple-600 text-white px-4 py-2 rounded">
                        Insert
                    </button>
                </div>
                <TodoList todos={todos} handleCheckboxChange={handleCheckboxChange} deleteTodo={deleteTodo} editTodo={editTodo} />
            </div>
        </div>
    );
}

