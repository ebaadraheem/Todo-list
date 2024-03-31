import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Completed from './components/Completed'
import Todos from './components/Todos'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [temp, settemp] = useState({})
  const togg = useRef(true)

  const [todos, settodos] = useState(() => {
  
    const savedTemp = localStorage.getItem('todos');
   
    return savedTemp ? JSON.parse(savedTemp) : [];
  });

  const [completed, setcompleted] = useState(() => {
  
    const savedTemp = localStorage.getItem('completed');

    return savedTemp ? JSON.parse(savedTemp) : [];
  });
  const Input = useRef(null)
  const hidden = useRef()
  const Id = useRef(0)

  useEffect(() => {
    
    localStorage.setItem('completed', JSON.stringify(completed));

  }, [completed]);
  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos));
  
  }, [todos]);

  function OnChange(e) {
    let name = e.target.name
    let value = e.target.value
    let obj = { [name]: value }
    settemp(values => ({ ...values, obj }))

  }
  function HandleKey(event) {
    if (event.key==="Enter") {
      Add()
    }
  }

  function Add() {
    if (Input.current.value.trim().length !== 0) {
      const newName = Input.current.name;
      const newLine = Input.current.value;
      const newTodo = {
        [newName]: newLine,
        "Id": Id.current + 1,
        "Task": "incomplete"
      };
      Id.current = Id.current + 1
      settodos(preTodos => [...preTodos, newTodo])

      Input.current.value = "";

    }

  }
  function HandleCheckComplete() {
    
    if (togg.current) {
      hidden.current.style.display ="block"
      togg.current=!togg.current
    }
    else{
      hidden.current.style.display ="none"
      togg.current=!togg.current
    }
  
  }
    

  return (
    < >
      
      <div className=' flex-col justify-center items-center min-h-[90vh] m-5 pt-10 h- rounded-lg bg-slate-100 '>

        <Navbar />
        <div className='  mb-8 w-full h-12 flex justify-center items-center '>
          <div className='flex h-11 w-4/6 px-5 bg-white justify-around items-center gap-3 rounded-md'>
            <input ref={Input} className='bg-white w-full  outline-none' type="text" placeholder='Add New...' name={"Todo"} value={temp.value} onChange={OnChange} onKeyDown={HandleKey} />
            <div className="flex h-8 w-16 bg-blue-500 items-center justify-center rounded-md cursor-pointer hover:bg-blue-600" onClick={Add}>Save</div>
          </div>
        </div>
        
        <div className='flex justify-center'>
          <div className='flex items-center gap-2 pl-2 w-2/3'><input  onChange={HandleCheckComplete} className=' size-4' type="checkbox" name="Check"  /><h3 className=' text-xl font-bold'>Completed</h3></div>
        </div>
        <div style={{display:"none"}}  ref={hidden} >
        {completed.map(comp => (
          <Completed key={uuidv4()} setcompleted={setcompleted} completed={completed}  name={comp.Todo} Id={comp.Id} todos={todos} />

        ))}
        </div>
        <div className='flex justify-center'><hr className=' w-2/3 mt-5 mb-2 border-slate-400 ' /></div>
        <div className='flex justify-center'>
          <div className=' pl-2 w-2/3'><h3 className=' text-xl font-bold'>Your Todos</h3></div>
        </div>
        <div className=' flex justify-center pl-3'>
          <div className=' inline-grid w-2/3 gap-3 '>
            {todos.map(todo => (
              <Todos completed={completed} setcompleted={setcompleted} Input={Input} todos={todos} settodos={settodos} key={uuidv4()} name={todo.Todo} Id={todo.Id} />
            ))}


          </div>
        </div>
      </div>

    </>
  )
}

export default App
