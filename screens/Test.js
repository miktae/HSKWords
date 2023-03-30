import { View, ScrollView, Text, Button, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import hskData from '../assets/hsk.json';
import { useStore, useBearsStore } from './store.js';
import TestTap from './widgets/TestTap';

const Test = () => {

  const wArray = useStore(state => state.wArray);
  const tScore = useBearsStore(state => state.tScore);
  let previousNumbers = [];

  const generateUniqueNumber = () => {
    let randomNumber = Math.floor(Math.random() * 3);
    if (previousNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 3);
    }
    previousNumbers.push(randomNumber);
    return randomNumber;
  };

  useEffect(() => {
    // console.log(wArray);
    // wArray.map((w, i) => console.log(w));
  }, [])

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.heading}>
        <Text style={styles.score}>
          Score:  <Text style={styles.score}>{tScore}</Text>
        </Text>
      </View>
      {
        wArray.map((w, i) => (
          <TestTap key={i} index={i + 1} testTitle={
            hskData.words[w]['translation-data'].english
          } testAnswer={[hskData.words[w + generateUniqueNumber()]['translation-data'].english
            , hskData.words[w + generateUniqueNumber()]['translation-data'].english,
          hskData.words[w + generateUniqueNumber()]['translation-data'].english]}
            correctAnswer={hskData.words[w]['translation-data'].simplified}
          ></TestTap>
        ))
      }
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => { }}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  score: {
    fontSize: 21,
    fontWeight: 600,
  },
  buttonContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 600
  }
})

export default Test