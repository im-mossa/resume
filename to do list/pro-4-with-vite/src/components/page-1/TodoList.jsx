// import TodoListItem from "./TodoListItem";

// export default function TodoList({ todos, deleteTodoHandler, toggleTodoCheckedHandler, editTodoTitleHandler }) {
//   return (
//     <ul className="list-reset">
//       {todos.map((todo, index) => (
//         <TodoListItem 
//           todo={todo} 
//           key={index} 
//           deleteTodoHandler={deleteTodoHandler} 
//           toggleTodoCheckedHandler={toggleTodoCheckedHandler} 
//           editTodoTitleHandler={editTodoTitleHandler} 
//         />
//       ))}
//     </ul>
//   );
// }



// تمرین

// TodoList.js 


import TodoListItem from "./TodoListItem";
export default function TodoList({ todos, handleCheckboxChange, deleteTodo, editTodo }) {
    return (
        <ul className="list-reset"> {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} handleCheckboxChange={handleCheckboxChange} deleteTodo={deleteTodo} editTodo={editTodo} />))}
        </ul>
    );
}

