import 'expo-dev-menu'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default App = () => {
  const [text, onChangeText] = useState("");
  const [todos, mutateTodos] = useState([]);

  const addTodo = (todoName) => {
    mutateTodos(todos => [...todos, { name: todoName } ])
  }
  
  const removeTodo = (index) => {
    mutateTodos(todos => {
      const newTodos = [...todos]
      newTodos.splice(index, 1);
      return newTodos
    })
  }
  
  useEffect(() => {
    onChangeText("")
  }, [todos])
  
  return (
    <View style={styles.container}>
      <Text>Enter a Todo:</Text>
      <TextInput onChangeText={onChangeText} placeholder="Enter a todo" value={text} />
      {text != "" && text.length < 3 ? (
        <Text style={{
          color: "red"
        }}>Your todo must be longer than 3 characters</Text>
      ) : ""}
      <Button title="Add Todo" onPress={() => addTodo(text)} disabled={text.length < 3}></Button>
      {todos.map((item, index) => {
        return (
          <View>
            {/*hacky fix, assign each key a unique index*/}
            <Text key={`${item.name.slice(0, 2)}_customIndex`}>{item.name}</Text>
            <Button title="X" onPress={() => removeTodo(index)}></Button>
          </View>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
