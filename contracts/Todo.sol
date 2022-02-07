pragma solidity ^0.8.11;

contract Todo {
  

  string [] public todoList;
  string public task;
 
    constructor(){
        setTodo("Task created");
    }

  function setTodo(string memory NewTask) public {
    task = NewTask;
    todoList.push(task);
  }

  function getTodo() public view returns (string [] memory) {
    return todoList;
    
  }


}