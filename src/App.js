import {useState, useEffect} from 'react';
import './App.css';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://kncpxougvldubgtuqpyn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY3B4b3VndmxkdWJndHVxcHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NzIwNzcsImV4cCI6MjAyNjM0ODA3N30.r7Z0q1iWbLbmbOdhKKPgvZsT4JXstUKILfk1h0TMzX4')

const isLoggedIn = true;

function RandomName(){
  const [name, setName] = useState('');
  const names = ['Luna', 'Benjamin', 'Camila', 'Charles', 'Ava', 'Henry', 'Annalise', 'Alexander', 'Olivia', 'Elijah'];
  const generate = () => { 
    const name = 
        names[Math.floor(Math.random() * names.length)]; 
    setName(name); 
  };
  return ( 
    <div className="namegenerator"> 
        <h3> 
            Random Name Generator 
        </h3> 
        <div className="button"> 
            <button className="generate"
                onClick={generate}> 
                Name?
            </button> 
        </div> 
        <p className="generated-name">  
                {`${name}`} 
            </p>
    </div>
  );
}

function GetBooks(){
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks(){
    let { data } = await supabase.from('Books').select('*');
    setBooks(data);
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title} - {book.author}</li>
      ))}
    </ul>
  );
}

function Button(){
  function thing(){
    alert('Thanks for logging in!!')
  }
  return(
    <button onClick={thing}>Are You Logged In?</button>
  )
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GetBooks />
        <div>
        {isLoggedIn ? (
          <Button />
        ) : (
          <p>Please login.</p>
        )}
        </div>
        <RandomName />
      </header>
    </div>
  );
}

export default App;
