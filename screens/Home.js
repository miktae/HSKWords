import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, ScrollView, Modal, Dimensions } from 'react-native';
import Tap from './widgets/Tap';
import Loading from './widgets/Loading';
import hskData from "../assets/hsk.json"
import { useStore, useRefresh, toggleDarkMode } from './store.js'
const screenDimensions = Dimensions.get('screen');

// console.log(hsk1Data.words[0]);

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showReminder, setShowReminder] = useState(false);
  const n = useStore(state => state.n);
  const removeN = useStore(state => state.removeN);
  const refresh = useRefresh(state => state.refresh);
  const updateT = useStore(state => state.updateT);
  const addWords = useStore(state => state.pushToArray);
  const index = useStore(state => state.index);
  const isDarkMode = toggleDarkMode(state => state.isDarkMode);

  useEffect(() => {
    generateRandomNumbers();  // generate initial set of numbers on mount
    // console.log(n);
    if (n >= 3) {
      updateT()
      setShowReminder(true)
      removeN()
    }
  }, []);

  useEffect(() => {
    if (randomNumbers) {
      addWords(randomNumbers)
      setIsLoading(false)
    }
  }, [randomNumbers]);

  useEffect(() => {
    // console.log(refresh);
    generateRandomNumbers();
  }, [refresh]);

  const generateRandomNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      const number = Math.floor(Math.random() * 600);
      numbers.push(number);
    }
    setRandomNumbers(numbers);
  };

  const handlePress = () => {
    //  console.log(randomNumbers);
    navigation.navigate('Questions', { randomNumbers })
  }

  const backgroundColor = isDarkMode ? '#121212' : '#f0f2f5';
  const color = isDarkMode ? '#fff' : '#000';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor, color }]}>
      {
        isLoading ? <Loading></Loading> :
          <ScrollView showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Modal visible={showReminder} style={styles.modal}
              animationType="fade" transparent={true}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Do you want to test your HSK words now?
                </Text>
                <View style={styles.modalBtnContainer}>
                  <Pressable style={styles.btnOpen} onPress={() => { setShowReminder(!showReminder); navigation.navigate('Test') }}>
                    <Text style={styles.text}>OK</Text>
                  </Pressable>
                  <Pressable style={styles.btnClose} onPress={() => setShowReminder(!showReminder)}>
                    <Text style={styles.text}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={styles.content}>
              {randomNumbers.map((number, index) => (
                <Tap simplified={hskData.words[number]['translation-data'].simplified}
                  tradional={hskData.words[number]['translation-data'].traditional}
                  pinyin={hskData.words[number]['translation-data'].pinyin}
                  soundUrl={hskData.words[number]['translation-data']['pinyin-numbered']}
                  meaning={hskData.words[number]['translation-data'].english}
                  key={index} />
              ))
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.button}
                title="Questions"
                onPress={handlePress} />
            </View>
            <StatusBar style="auto" />
          </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
  modalView: {
    width: screenDimensions.width / 3,
    height: screenDimensions.height / 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: screenDimensions.width / 3,
    marginVertical: screenDimensions.height / 3,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  btnOpen: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  btnClose: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
