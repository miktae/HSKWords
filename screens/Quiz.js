import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableHighlight } from 'react-native';
import * as hskData from "../assets/hsk.json"
import { useRoute } from '@react-navigation/native';

const Quiz = () => {
  const route = useRoute();
  const { randomNumbers } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const [questions, setQuestions] = useState([]);
  // const questions = [];

  const fetchData = (indexNumber) => {
    setQuestions(
      {
        question: hskData.words[randomNumbers[indexNumber]]['translation-data'].simplified,
        answers: [
          hskData.words[randomNumbers[generateUniqueNumber()]]['translation-data'].english,
          hskData.words[randomNumbers[generateUniqueNumber()]]['translation-data'].english,
          hskData.words[randomNumbers[generateUniqueNumber()]]['translation-data'].english,
          hskData.words[randomNumbers[generateUniqueNumber()]]['translation-data'].english,
          hskData.words[randomNumbers[generateUniqueNumber()]]['translation-data'].english,
        ],
        correctAnswer: hskData.words[randomNumbers[indexNumber]]['translation-data'].english,
      },
    )
  };

  useEffect(() => {
    console.log(randomNumbers);

    console.log(currentQuestion);

    fetchData(index);

  }, [])

  console.log(questions);

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

  const onAnswer = (answer) => {

    //  console.log(answer);
    //  console.log(questions.correctAnswer);

    const isCorrect = questions.correctAnswer == answer;
    console.log(isCorrect);

    if (isCorrect) {
      index < 5 ? setScore(isCorrect ? score + 1 : score) : console.log("Done");
      setIndex(index < 5 ? index + 1 : index);
      index < 5 ? fetchData(index) : console.log("Done");
      setCurrentQuestion(currentQuestion + 1);
    }
    else {
      Alert.alert("Your answer is wrong");
    }

  };

  if (index >= 5) {
    return (
      <View>
        <Text>You have scored {score} out of 5.</Text>
      </View>
    );
  }

  return (
    <View>
      {
        questions ?
          <View>
            <Text>{questions.question}</Text>
            {
              questions.answers && questions.answers.map((answer, index) => (
                <TouchableHighlight key={index}
                  onPress={() => onAnswer(answer)}>
                  <Text>title={answer}</Text>
                </TouchableHighlight>
              ))}
          </View>
          : "Data failed to set"}
      <Text>
        SCORE: {score}
      </Text>
    </View>

  );
};

export default Quiz;
