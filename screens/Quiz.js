import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Question from './widgets/Question';

const Quiz = () => {
  const route = useRoute();
  const { data } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const questions = [];

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      questions.push(
        {
          question: data[0] ? data[i]["simplified"] : "Data unload",
          answers: [
            data[0] ? data[generateUniqueNumber()]["meaning"] : "Data unload",
            data[0] ? data[generateUniqueNumber()]["meaning"] : "Data unload",
            data[0] ? data[generateUniqueNumber()]["meaning"] : "Data unload",
          ],
          correctAnswer: data[0] ? data[i]["meaning"] : "Data unload",
        },
      )
    }
  }, [])

  let previousNumbers = [];

// generate a random unique number between 0 and 5
const generateUniqueNumber = () => {
  let randomNumber = Math.floor(Math.random() * 5); // generates a random integer between 0 and 5
  while (previousNumbers.includes(randomNumber)) {
    // if the number has already been generated, generate a new one
    randomNumber = Math.floor(Math.random() * 5);
  }
  // add the generated number to the array of previous numbers
  previousNumbers.push(randomNumber);
  // return the generated number
  return randomNumber;
};

  const handleAnswerSelected = (answer) => {
    const isCorrect = questions[currentQuestion].correctAnswer === answer;
    setScore(isCorrect ? score + 1 : score);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return (
      <View>
        <Text>You have scored {score} out of {questions.length}.</Text>
      </View>
    );
  }

  return (
    <View>
      <Question
        question={questions[currentQuestion].question}
        answers={questions[currentQuestion].answers}
        onAnswerSelected={handleAnswerSelected}
      />
      <Text>
        SCORE: {score}
      </Text>
    </View>

  );
};

export default Quiz;
