import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Todos = ({ name, Id, Input, todos, settodos, completed, setcompleted }) => {

  const [checkedItems, setCheckedItems] = useState({});


  const handleCheckboxChange = (id) => {

    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
    const object = getObjectById(id);
    setcompleted(preTodos => [...preTodos, object])

    Delete(id)

  };
  useEffect(() => {
    
    localStorage.setItem('todos', JSON.stringify(todos));
   

  }, [todos]);
  useEffect(() => {
    
    localStorage.setItem('completed', JSON.stringify(completed));
  

  }, [completed]);
  const getObjectById = (id) => {
    return todos.find(obj => obj.Id === id);
  };

  const Delete = (id) => {
    settodos(todos => {
      const updatedTodos = todos.filter(todo => todo.Id !== id);
      
      return updatedTodos;
    });
  };
  const Edit = (name, id) => {
    Input.current.value = name;
    Delete(id); 
  };
  return (

    <div className=' flex gap-3 items-center '><input checked={checkedItems[Id] || false} onChange={() => handleCheckboxChange(Id)} className=' size-4' type="checkbox" name="Check" id={Id} />
      <h1 className=' w-2/5 text-md break-all'>{name}</h1>
      <span className=' flex h-7 hover:bg-blue-600 w-9 bg-blue-500 items-center justify-center rounded-md cursor-pointer' onClick={() => { Edit(name, Id) }}><FaEdit /></span>
      <span className='flex h-7 hover:bg-blue-600 w-9 bg-blue-500 items-center justify-center rounded-md cursor-pointer' onClick={() => { Delete(Id) }}><MdDelete /></span>

    </div>
  )
}

export default Todos


