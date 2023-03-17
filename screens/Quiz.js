import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableHighlight, Platform } from 'react-native';
import * as hskData from '../assets/hsk.json';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';

const Quiz = () => {
  const route = useRoute();
   const { randomNumbers } = route.params;
  // const randomNumbers = [2, 1, 3, 6, 9];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [sound, setSound] = useState();
  const [questions, setQuestions] = useState([]);
  const query = ["A", "B", "C", "D", "E"];

  const fetchData = (indexNumber) => {
    const word = hskData.words[randomNumbers[indexNumber]]['translation-data'];
    const answers = Array.from({ length: 5 }, () => {
      const randomNumber = generateUniqueNumber();
      return hskData.words[randomNumbers[randomNumber]]['translation-data'].english;
    });
    setQuestions({
      question: word.simplified,
      answers,
      correctAnswer: word.english,
    });
  };

  let previousNumbers = [];

  const generateUniqueNumber = () => {
    let randomNumber = Math.floor(Math.random() * 5);
    while (previousNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 5);
    }
    previousNumbers.push(randomNumber);
    return randomNumber;
  };

  async function playSound(m_type) {
   // console.log('Loading Sound');

    if (m_type === true) {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/correct.mp3')
      );
      setSound(sound);
      await sound.playAsync()
    }
    else if (m_type === false){
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/incorrect.wav')
      );
      setSound(sound);
      await sound.playAsync()
    }
  }

  useEffect(() => {
    fetchData(index);
  }, []);

  const onAnswer = (answer) => {
    const isCorrect = questions.correctAnswer === answer;
    if (isCorrect) {
      playSound(true);
      setScore(score + 1);
      setCurrentQuestion(currentQuestion + 1);
      if (index < 5) {
        setIndex(index + 1);
        fetchData(index + 1);
      }
    } else {
      playSound(false);
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        Alert.alert(
          'Your answer is wrong',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );

        setTimeout(() => {
          Alert.alert('', '', []);
        }, 1000);
      }
      else {

      }
    }
  };

  if (index >= 5) {
    return (
      <View >
        <Text style={styles.congratText}>Congratulation! You have scored {score} out of 5.</Text>
      </View>
    );  
  }

  return (
    <View>
      <Text style={styles.score}>SCORE: {score}</Text>
      {questions ? (
        <View style={styles.questions}>
          <Text style={styles.questionsTitle}>{questions.question} meaning: </Text>
          {questions.answers && questions.answers.map((answer, index) => (
            <TouchableHighlight style={styles.touchableHighlight} key={index} onPress={() => onAnswer(answer)}>
              <Text style={styles.answers}>{query[index]}, {answer}</Text>
            </TouchableHighlight>
          ))}
        </View>
      ) : (
        <Text>Data failed to set</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    paddingHorizontal: 180,
  },
  questionsTitle: {
    display: 'flex',
    fontSize: 32,
    justifyContent: 'center',
    marginBottom: 25
  },
  touchableHighlight: {
    backgroundColor: '#fff',
    borderWidth: 0.001,
    borderRadius: 3,
    margin: 5,
    padding: 3,
  },
  answers: {
    fontSize: 25,
    alignItems: 'center',
    backgroundColor: '#ececec',
    padding: 9,
    overflow: 'hidden',
  },
  score: {
    fontSize: 25,
    margin: 5,
  },
  congratText: {
    fontSize: 20,
  }
});

export default Quiz;
