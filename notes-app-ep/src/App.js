import { useState } from 'react';
import { nanoid } from 'nanoid'
import './App.css';
import NotesList from './components/NotesList';

function App() {
  const[notes,setNotes]=useState([
    {
    id: nanoid(),
    text: 'first note',
    data: '12/12/13'
  },
  {
    id: nanoid(),
    text: 'second note',
    data: '16/12/14'
  },
  {
    id: nanoid(),
    text: 'third note',
    data: '12/11/15'
  },
  {
    id: nanoid(),
    text: 'fourth note',
    data: '11/12/16'
  },
])
  return (
    <div className="container">
        <NotesList notes={notes}/>
    </div>
  );
}

export default App;
