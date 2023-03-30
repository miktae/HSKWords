import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore, useBearsStore } from '../store.js';
const screenDimensions = Dimensions.get('screen');

export default function TestTap(props) {
    const updateScore = useBearsStore(state => state.updateScore);
    const [text, setText] = useState();

    useEffect(() => {
        // console.log(text);
        // console.log(props.correctAnswer);
        if (text == props.correctAnswer) {
            console.log('correctAnswer');
            updateScore();
        }
    }, [text])

    return (
        <View style={styles.testView}>
            <View style={styles.testContent}>
                <Text style={styles.text}>Q{props.index}. {props.testTitle} in Chinese is: </Text>
                <View>
                    <TextInput style={styles.input} placeholder="Enter text here"
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