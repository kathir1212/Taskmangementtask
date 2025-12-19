import { useState } from 'react'

import './App.css'
import TaskBoardBlocks from './components/taskblock'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <div className="p-2">
      <TaskBoardBlocks />
    </div>

<div className=''>
 {/* <Routes>
            <Route path="/TaskForm" element={<Taskform />} />
   </Routes> */}
</div>
    
    </>
  )
}

export default App
