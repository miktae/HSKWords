import React from 'react';
import { Text, View, StyleSheet, Button  } from 'react-native';

const Question = (props) => {
  const { question, answers, onAnswerSelected } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {answers.map((answer, index) => (
        <Button
          key={index}
          title={answer}
          onPress={() => onAnswerSelected(answer)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Question;