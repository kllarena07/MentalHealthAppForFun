import 'expo-dev-menu'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg'

//Declare Variables
class level {
    constructor(exp, maxExp, lv) {
        this.exp = exp; //Keeps track of the current amount of exp
        this.maxExp = 5000; //Keeps track of the amount of exp needed to reach the next level
        this.lv = lv; //Keeps track of level number
    }
    gainEXP(x){
            exp += x; //adds exp to current exp
            if (exp >= maxExp) { //if exp meets or exceeds max, declare a level up
                lvUP();
            }
        }

        lvUP(){
            exp -= maxExp; //gets remaining exp
            maxExp += 100; //raises the amount needed to reach the next level
            lv++; //Incriments the level by 1
        }

    }

export default App = () => {
  const [text, onChangeText] = useState("");
  const [todos, mutateTodos] = useState([]);

  const addTodo = (todoName) => {
    mutateTodos(todos => [...todos, { name: todoName } ])
  }
  
  const removeTodo = (index) => {
    mutateTodos(todos => {
      const newTodos = [...todos]
      newTodos.splice(index, 1)
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
      <Text>My Todos:</Text>
      <View>
        {todos.length > 0 ? (
          <>
            {
              todos.map((item, index) => {
                return (
                  <View>
                    <Text key={`${item.name.slice(0, 2)}_customIndex`}>{item.name}</Text>
                    <Button title="X" onPress={() => removeTodo(index)}></Button>
                  </View>
                )
              })
            }
          </>
        ) : (
          <Text>You have no todos. Go ahead and make some!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
