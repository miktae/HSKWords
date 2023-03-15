import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import Tap from './widgets/Tap';
import * as hskData from "../assets/hsk.json"

// console.log(hsk1Data.words[0]);

export default function Home({ navigation }) {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    generateRandomNumbers();  // generate initial set of numbers on mount
    const intervalId = setInterval(generateRandomNumbers, 24 * 60 * 60 * 1000); // generate new numbers every day
    return () => clearInterval(intervalId); // clear the interval when the component unmounts
  }, []);

  const generateRandomNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      const number = Math.floor(Math.random() * 600);
      numbers.push(number);
    }
    setRandomNumbers(numbers);
  };

  const handlePress = () => {
    setData(...data,
      randomNumbers.map((number) => (
       {
        "simplified": hskData.words[number]['translation-data'].simplified,
        "tradional" : hskData.words[number]['translation-data'].traditional,
        "pinyin" : hskData.words[number]['translation-data'].pinyin,
        "meaning": hskData.words[number]['translation-data'].english
      })
    ))
    navigation.navigate('Questions', { data })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
       style={styles.scrollView}>
      <View style={styles.content}>
        {randomNumbers.map((number, index) => (
          <Tap simplified={hskData.words[number]['translation-data'].simplified}
            tradional={hskData.words[number]['translation-data'].traditional}
            pinyin={hskData.words[number]['translation-data'].pinyin}
            soundUrl={hskData.words[number]['translation-data']['pinyin-numbered']}
            meaning={hskData.words[number]['translation-data'].english}
            key={index} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}
         title="Questions" 
         onPress={handlePress}/>
      </View>
      <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
  },
  scrollView: {
    marginHorizontal: 0,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: { 
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
