// import { useState } from "react";
// import DeleteIcon from "../icons/DeleteIcon";
// import EditIcon from "../icons/EditIcon";

// export default function TodoListItem({ todo, deleteTodoHandler, toggleTodoCheckedHandler, editTodoTitleHandler }) {
//   const [editMode, setEditMode] = useState(false);
//   const [editValue, setEditValue] = useState(todo.title);

//   const editTodoHandler = (event) => {
//     if (event.key === "Enter") {
//       editTodoTitleHandler(todo, editValue);
//       setEditMode(false);
//     }
//   };

//   return (
//     <li className="relative flex items-center justify-between px-2 py-6 border-b">
//       {editMode ? (
//         <div>
//           <div className="w-full flex items-center">
//             <input 
//               type="text" 
//               value={editValue} 
//               onChange={(e) => setEditValue(e.target.value)} 
//               onKeyDown={editTodoHandler} 
//               className="w-full mr-2 px-4 py-2 border border-gray-200 rounded" 
//             />
//           </div>
//           <button type="button" className="w-18 space-x-1 mt-1">
//             <DeleteIcon onclick={() => { setEditMode(false) }} className="" />
//           </button>
//         </div>
//       ) : (
//         <div className="h-14">
//           <div>
//             <input 
//               type="checkbox" 
//               checked={todo.checked} 
//               onChange={() => { toggleTodoCheckedHandler(todo) }} 
//               className="" 
//             />
//             <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo.checked ? 'line-through' : ''}`}>{todo.title}</p>
//           </div>
//           <button type="button" className="absolute right-0 flex items-center space-x-1">
//             <EditIcon onclick={() => { setEditMode(true) }} />
//             <DeleteIcon onclick={() => { deleteTodoHandler(todo) }} />
//           </button>
//         </div>
//       )}
//     </li>
//   );
// }



// تمرین

// TodoListItem.js


import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
export default function TodoListItem({ todo, handleCheckboxChange, deleteTodo, editTodo }) {
    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            <div>
                <input type="checkbox"  name="checkbox" checked={todo.checked} onChange={() => handleCheckboxChange(todo.id)} className="" />
                <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo.checked ? 'line-through' : ''}`}> {todo.title} </p>
            </div>
            <button type="button" className="absolute right-0 flex items-center space-x-1">
                <EditIcon onclick={() => {editTodo(todo.id)}} />
                <DeleteIcon todo={todo} deleteTodo={deleteTodo} onClick={() => deleteTodo(todo.id)} />
            </button>
        </li>);
}

