import { View, Text, TextInput, StyleSheet, Dimensions, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBearsStore } from '../store.js';
import { Audio } from 'expo-av';

export default function TestTap(props) {
    const updateScore = useBearsStore(state => state.updateScore);
    const [text, setText] = useState();
    const [sound, setSound] = useState();

    async function playSound(m_type) {
        // console.log('Loading Sound');
    
        if (m_type === true) {
          const { sound } = await Audio.Sound.createAsync(
            require('../../assets/correct.mp3')
          );
          setSound(sound);
          await sound.playAsync()
        }
        else if (m_type === false) {
          const { sound } = await Audio.Sound.createAsync(
           require('../../assets/incorrect.wav')
          );
          setSound(sound);
          await sound.playAsync()
        }
      }

    useEffect(() => {
        // console.log(text);
        // console.log(props.correctAnswer);
        if (text == props.correctAnswer) {
            console.log('correctAnswer');
            updateScore();
            playSound(true);
        }
    }, [text])

    function setSoundUrl(url) {
        const soundUrlArr = [];
        const match = url.match(/^([a-zA-Z]+)(\d.*)/);

        if (match) {
            const firstPart = match[1] + match[2].match(/^\d+/)[0];
            const secondPart = match[2].replace(/^\d+/, '');
            soundUrlArr.push(firstPart);
            soundUrlArr.push(secondPart);

            //   console.log(firstPart, secondPart);
        } else {
            console.log('Invalid string');
        }
        return soundUrlArr;
    }

    const playPinyinSound = async () => {
        if (setSoundUrl(props.sound)[1] == '') {
            const { sound } = await Audio.Sound.createAsync({
                uri: "https://cdn.yoyochinese.com/audio/pychart/"
                    + props.sound + ".mp3"
            });
            // console.log("https://cdn.yoyochinese.com/audio/pychart/"
            // + props.soundUrl + ".mp3");
            setSound(sound);
            //   console.log('Playing Sound');
            await sound.playAsync();
        }
        else {
            const { sound } = await Audio.Sound.createAsync({
                uri: "https://cdn.yoyochinese.com/audio/pychart/"
                    + setSoundUrl(props.sound)[0] + ".mp3"
            });

            setSound(sound);

            await sound.playAsync().then(
                setTimeout(async function () {
                    const { sound } = await Audio.Sound.createAsync({
                        uri: "https://cdn.yoyochinese.com/audio/pychart/"
                            + setSoundUrl(props.sound)[1] + ".mp3"
                    });

                    setSound(sound);
                    await sound.playAsync()

                }, 600)
            )
        }
    }

    return (
        <View style={styles.testView}>
            <View style={styles.testContent}>
                <Text style={styles.text}>Q{props.index}. {props.testTitle} in Chinese(simplified) is: </Text>
                <View>
                    <TextInput style={styles.input} placeholder="Enter text here"
                        onFocus={() => { playPinyinSound() }}
                        onChangeText={(text) => { setText(text) }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    testView: {
        display: 'flex',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    testContent: {
        marginLeft: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',

    },
    text: {
        fontSize: 21,
        marginBottom: 10,
    },
    input: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 7,
    }
});