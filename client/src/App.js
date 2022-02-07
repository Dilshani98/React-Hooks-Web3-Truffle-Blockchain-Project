import React, { Component } from "react";
// import Todo from "./contracts/Greeting.json";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Todo from "./contracts/Todo.json";


import "./App.css";


function App() {

  const [state,setState] =useState({
    web3 : null,
    instance : null,
  });
  const [account, setAccount] = useState();
  const [todoList, setTodoList] = useState([]);
  const [task,setTask] =useState("");

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Todo.networks[networkId];

      let _instance = new web3.eth.Contract(Todo.abi,'0x1e4547e740842dca14707093aEd7a0a596ab81f9');

      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);

      setState({web3,instance:_instance});
      if(_instance){
        const todo = await _instance.methods.getTodo().call();
        // setTodoList([...todoList,task]);
        setTodoList(...todoList,todo);
        console.log(todoList);
      }

      //  const greetingContract = new web3.eth.Contract(Greeting.abi,greetingContract.networks[networkId].address);

      

    }

    load();
  }, []);

 
    const onAddTask = async (e)=>{
      e.preventDefault();
      await state.instance.methods.setTodo(task)
      .send({from:account})
      console.log(task)
      .then((res) => {
        console.log("res :>> ", res);
      });
    }


  return !state && !state.contract?(
    <div>Loading Web3, account, and contract.....</div>
  ):(
  
    <div>
      <h1>account is: {account}</h1>
       

      <form onSubmit={(e) => onAddTask(e)}>
        <input
          label="Insert Task"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button type="submit">
          ADD
        </button>
      </form>


      <h3>Todo List</h3>
      <ul>
        {todoList.map((item)=>(
          <div>
            <li key={item.id}>
            <p>{item}</p>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
