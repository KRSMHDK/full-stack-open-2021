import React, { useState } from "react";

const Button = ({ handleClick, handleVoteClick }) => {
  return (
    <div>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleClick}>Next Anecdote</button>
    </div>
  );
};

const Vote = ({ points, selected }) => {
  return <div>has {points[selected]} votes</div>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  const mostVotes = points.indexOf(Math.max(...points));
  const increaseVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const chooseRandomAnecdotes = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  return (
    <div>
      {anecdotes[selected]}
      <Vote points={points} selected={selected} />
      <Button
        handleVoteClick={increaseVote}
        handleClick={chooseRandomAnecdotes}
      />
      <div>
        {" "}
        <h1>Anecdote with most Votes</h1>
      </div>
      {anecdotes[mostVotes]}
      <Vote points={points} selected={mostVotes} />
    </div>
  );
};

export default App;
