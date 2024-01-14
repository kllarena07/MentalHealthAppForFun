import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { StoredTasks, newTaskObj } from './lib/data/tasks';
import 'expo-dev-menu'

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

const App = () => {
  const [text, changeText] = useState("")
  const [tasks, mutateTasks] = useState(StoredTasks)
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window")
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change" , ({ window }) => {
      setDimensions({ window })
    })

    return () => subscription?.remove()
  })

  const addTask = (taskName, xpVal) => {
    if(taskName.length > 3)
      mutateTasks(todos => [...todos, newTaskObj(taskName, xpVal) ])
  }

  const completeTask = (index) => {
    mutateTasks(todos => {
      const newTodos = [...todos]
      newTodos.splice(index, 1)
      return newTodos
    })
  }

  const handleInputChange = (inputText) => {
    changeText(inputText)
  }

  const { window } = dimensions
  const windowWidth = window.width
  const windowHeight = window.height
  
  return (
    <SafeAreaView style={[styles.safeWrapper, {
      width: windowWidth,
      height: windowHeight
    }]}>
      <View style={styles.container}>
        <Text style={styles.h1}>Today's Tasks</Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#485fc4",
          borderRadius: 16,
          marginBottom: 10,
          height: 56
        }}>
          <TextInput style={{
            padding: 16,
            fontWeight: "bold",
            color: "white"
          }}
          value={text}
          onChangeText={handleInputChange}
          placeholder="Enter a New Task" placeholderTextColor="white" />
          <TouchableOpacity onPress={() => {
            addTask(text, 10)
            changeText("")
          }}>
            <Svg style={{
              width: 48,
              height: 48
            }} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="0" stroke="#485fc4">
              <Path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </Svg>
          </TouchableOpacity>
        </View>
        {text.length < 3 && text.length != 0 ? <Text style={{
          textAlign: 'center',
          color: "red",
          marginBottom: 10
        }}>Tasks names must be greater than 3 characters</Text> : undefined}
        <FlatList
          data={tasks}
          renderItem={({ item }, index) => 
                <TouchableOpacity style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 8,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 12
                }} onPress={() => completeTask(index)}>
                <Svg style={{
                      width: 24,
                      height: 24,
                      marginRight: 4
                }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <Path fill="grey" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/>
                </Svg>
                <Text>{item.name}</Text>
                </TouchableOpacity>
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={<View style={{
            height: 10
          }} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeWrapper: {
    position: "relative",
    backgroundColor: '#f7f8fe'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "blue"
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  }
});

export default App
