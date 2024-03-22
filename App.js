import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import Button from "./src/components/Button";
import Task from "./src/components/Task";
import styles from "./Global";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask]= useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterdTasks, setFilterdTasks] = useState([]);

  function addNewTask(){
    setError("");
    if (newTask !== "") {
   setTasks([...tasks, { text: newTask, completed: false }]);
  } else {
    setError("Preencha a atividade");
  }
}

  function toggleTask(index) {
   const newTask =[...tasks];
   const isTakCompleted = newTask[index].completed;
   if (isTakCompleted) {
    newTask[index].completed = false;
   } else {
    newTask[index].completed = true;
   }
   setTasks(newTask);

  }

  useEffect(()=>{
   const initialTasks=[
     {text:"Atividade 1", completed:false},
     {text:"Atividade 2", completed:true},
     {text:"Atividade 3", completed:true},

   ];
   setTasks(initialTasks);
  },[]);

  useEffect(() => {
    let result = tasks;
    if (filter === 'completed'){
      result = tasks.filter((task) => task.completed);
    } else if (filter == "active") {
      result = tasks.filter((task) => !task.completed);
    }
    setFilterdTasks(result);
  },[tasks, filter]);

  
  return <View style={styles.container}>
    <TextInput 
    value={newTask} 
    style={styles.input} 
    onChangeText={(text) => setNewTask(text)}
    />
    {error && <Text style={{color: "red", marginBottom: 16, fontSize: 16}}>{error}</Text>}
    <Button title="Adicionar" onPress={() => addNewTask()} />
    <View style={styles.filterContainer}>
      <Button title="Todas" selected={filter== "all"} onPress={() => setFilter("all")} />
      <Button title="Concluídas" selected={filter== "completed"}onPress={() => setFilter("completed")} />
      <Button title="Ativas" selected={filter== "active"}onPress={() => setFilter("active")} />
    </View>
    <View style={styles.listContainer}>
      {filterdTasks.map((task, index) => (
        <Task 
        key= {task.text}
        isChecked= {task.completed}
        label= {task.text}
         onPress={() => toggleTask(index)}/>
      ))}
      
    </View>
  </View>;
}
