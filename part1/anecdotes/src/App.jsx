import { useState } from 'react'


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const Button = (prop) => {
  return (
    <div>
      <button onClick={prop.onClick}> {prop.text} </button>
    </div>
  );
} 

const DebugVotes = (prop) => {
  return (
    <div>
      Debugging votes here:
      <table>
        <tbody>
          <tr>
            <th>{"Vote"}</th>
            <th>{"ID"}</th>
            <th>{"Text"}</th>
          </tr>

          <tr>
            <td>{prop.votes[0]}</td>
            <td>{"0"}</td>
            <td>{prop.anecdotes[0]}</td>
          </tr>
          <tr>
            <td>{prop.votes[1]}</td>
            <td>{"1"}</td>
            <td>{prop.anecdotes[1]}</td>
          </tr>
          <tr>
            <td>{prop.votes[2]}</td>
            <td>{"2"}</td>
            <td>{prop.anecdotes[2]}</td>
          </tr>
          <tr>
            <td>{prop.votes[3]}</td>
            <td>{"3"}</td>
            <td>{prop.anecdotes[3]}</td>
          </tr>
          <tr>
            <td>{prop.votes[4]}</td>
            <td>{"4"}</td>
            <td>{prop.anecdotes[4]}</td>
          </tr>
          <tr>
            <td>{prop.votes[5]}</td>
            <td>{"5"}</td>
            <td>{prop.anecdotes[5]}</td>
          </tr>
          <tr>
            <td>{prop.votes[6]}</td>
            <td>{"6"}</td>
            <td>{prop.anecdotes[6]}</td>
          </tr>
          <tr>
            <td>{prop.votes[7]}</td>
            <td>{"7"}</td>
            <td>{prop.anecdotes[7]}</td>
          </tr>
        </tbody>
      </table>  

    </div>
  );
}

const TopAnecdote = (prop) => {

  const maxKey = Object.keys(prop.votes).reduce((a, b) => prop.votes[a] > prop.votes[b] ? a : b);

  return (

    <div>
      <h1>Anecdote of the Day is </h1>
      <p>
        {maxKey} {"  "} {prop.anecdotes[maxKey]}
      </p>
    </div>
  );
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);

  const emptyVotes = Object.fromEntries(
    Array.from(anecdotes.length, (_, i) => [i, 0])
  );

  console.log(emptyVotes[7]);
  //  emptyVotes is  { 0: 0, 1: 0, 2: 0, 3: 0 }

  // const [votes, setVotes] = useState(emptyVotes);

  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {selected} {"  "} {anecdotes[selected]} 
      <Button onClick={()=> 
        {
          let nextIndex;
          do {
            // Range: 0 to anecdotes.length - 1
            nextIndex = Math.floor(Math.random() * anecdotes.length);
          } while (nextIndex === selected); // Keep rolling if it's the same as current
          
          setSelected(nextIndex);
        }
        } 
        text="New Anecdote" />

      <Button onClick={()=> {
            const copyVotes = { ...votes }
            // increment the property 2 value by one
            copyVotes[selected] += 1;
            setVotes (copyVotes);
            } 
          } 
          text="Vote" />
      <TopAnecdote anecdotes={anecdotes} votes={votes}/>    
      <DebugVotes anecdotes={anecdotes} votes={votes}/>
    </div>

  )
}

export default App