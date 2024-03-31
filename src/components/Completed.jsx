import React from 'react'
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
const Completed = ({  Id,completed,setcompleted, name }) => {
    const Delete = (id) => {
        setcompleted(comp => {
            
            const updatedCompleted = comp.filter(item => item.Id !== id);
            
            return updatedCompleted;
          });
    };

    useEffect(() => {
    
        localStorage.setItem('completed', JSON.stringify(completed));

      }, [completed]);

    return (
        <div>

            <div className=' flex justify-center mb-2 pl-3'>
                <div className=' inline-grid w-2/3 gap-3 '>

                    <div className=' flex gap-3 items-center break-all'>
                        <h1 className='w-2/5 text-md'>{name}</h1>

                        <span className='flex h-7 w-9 hover:bg-blue-600 bg-blue-500 items-center justify-center rounded-md cursor-pointer' onClick={() => { Delete(Id) }}><MdDelete /></span>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Completed
