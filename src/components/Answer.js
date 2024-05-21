import React from 'react';

const Answer = ({ answer, onClick }) => {
  return (
    <button className="answer" onClick={onClick}>
      {answer}
    </button>
  );
};

export default Answer;