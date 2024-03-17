import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';;

function App(){

  let [question,setQuestions] = useState([]);
  let [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
  let [total, setTotal] = useState(0);
  let [time,setTime] = useState(5);

  useEffect(() => {
    let fetchQuestions = async () => {
      try {
        let response = await axios.get("https://opentdb.com/api.php?amount=10&type=multiple");
        console.log(response.data.results);
        setQuestions(response.data.results);  
      } 
      catch (error) {
        console.log(error);
      }
    }
    fetchQuestions();
  },[]);


  useEffect(() => {
    let timer = setTimeout(()=>{
      if(time > 0){
        setTime(time - 1);
      }
      else{
        handleTime();
      }
    }, 1000);

    return () => clearTimeout(timer);
  })

  function handleTime(){
    moveToNextQuestion();
  }

  function moveToNextQuestion(){
    let nextQuestionIndex = currentQuestionIndex + 1;
    if(nextQuestionIndex < question.length){
      setCurrentQuestionIndex(nextQuestionIndex);
      setTime(5);
    }
    else{
      alert('Quiz completed! Your score is ' + total);
    }
  }

  function submitAnswer(selectedOption){
    let currentQuestion = question[currentQuestionIndex];
    if(currentQuestion.correct_answer === selectedOption){
      setTotal(total + 1);
    }
    moveToNextQuestion();
  }

  function handleSkipQuestion(){
    moveToNextQuestion();
  }


  return(
    <div>
        {
          question.length === 0 ? (<div>Loading...</div>) : (
            <div className='main'>
              <h1 className='h1'>Quiz App</h1>
              <h2 className='h2'>Question : {currentQuestionIndex + 1}</h2><br></br>
              <p className='ptag'>{question[currentQuestionIndex].question}</p>
              <div>
                { question[currentQuestionIndex].incorrect_answers.map((option,index) => (
                  <button className='btn_four' key={index} onClick={() => submitAnswer(option)}>{option}</button>
                ))}
                <button className='btn_four' onClick={() => submitAnswer(question[currentQuestionIndex].correct_answer)}>
                  {question[currentQuestionIndex].correct_answer}
                </button>
              </div>
              <p className='ptag'>Time Lefts : {time} seconds</p>
              <button className='btn_skip' onClick={handleSkipQuestion}>Skip Question</button>
            </div>
          )
        }
    </div>
  );
}

export default App;
