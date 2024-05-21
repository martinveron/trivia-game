import React, { useState, useEffect } from 'react';
import Question from './Question';
import Answer from './Answer';
import questions from '../questions.json'; // Ruta correcta al archivo JSON
import '../styles.css'; // Importar estilos CSS

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    setQuizData(questions.preguntas); // Carga las preguntas desde el JSON
  }, []);

  const shuffleAnswers = (answers) => {
    // Copiar las respuestas para evitar la mutación del estado original
    const shuffledAnswers = [...answers];
    // Barajar las respuestas utilizando el algoritmo de Fisher-Yates
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };

  const handleAnswerClick = (answer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (answer === currentQuestion.respuesta_correcta) {
      alert('¡Respuesta correcta!');
      // Pasar al siguiente nivel
      setCurrentLevel(currentLevel + 1);
    } else {
      alert('Respuesta incorrecta.');
      // Mostrar mensaje de juego terminado
      alert('¡Juego terminado! Has llegado al nivel ' + currentLevel);
      // Reiniciar el cuestionario o implementar lógica adicional aquí
      setCurrentQuestionIndex(0); // Reiniciar el cuestionario
      setCurrentLevel(1); // Reiniciar el nivel
      return; // Salir de la función para evitar la actualización adicional de estado
    }

    // Pasar a la siguiente pregunta si hay más preguntas
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Has completado todas las preguntas.');
      // Reiniciar el cuestionario o implementar lógica adicional aquí
      setCurrentQuestionIndex(0); // Reiniciar el cuestionario
      setCurrentLevel(1); // Reiniciar el nivel
    }
  };

  if (quizData.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const shuffledAnswers = shuffleAnswers([
    currentQuestion.respuesta_correcta,
    currentQuestion.respuesta_incorrecta1,
    currentQuestion.respuesta_incorrecta2,
    currentQuestion.respuesta_incorrecta3,
  ]);

  return (
    <div className="quiz-container">
      <div className="quiz">
        <Question question={currentQuestion.pregunta} />
        <div className="answers">
          {shuffledAnswers.map((answer, index) => (
            <Answer key={index} answer={answer} onClick={() => handleAnswerClick(answer)} />
          ))}
        </div>
      </div>
      <div className="levels">
        {[...Array(15)].map((_, index) => {
          const levelNumber = 15 - index;
          return (
            <div key={levelNumber} className={`level ${levelNumber === currentLevel ? 'current-level' : ''}`}>
              Nivel {levelNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
