import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.sass';

export default class App extends Component {
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Build Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
  };

  deleteItem = (id) => {
    this.setState( ({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      
      const newTodoData = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newTodoData
      }
    })
  }

  addItem = (text) => {
    this.setState( ({todoData}) => {

      let newId;

      if (todoData.length > 0) {
        const lastItem = todoData[todoData.length-1];
        newId = lastItem.id + 1;
      } else {
        newId = 1;
      }
      const newItem = {label: text, important: false, id: newId};
      console.log(newId);

      const newTodoData = [ 
        ...todoData,
       newItem
      ];

      return {
        todoData: newTodoData
      }
    })
  }

  onToggleImportant =(id) => {
    console.log('important', id);
  }

  onToggleDone =(id) => {
    console.log('done', id)
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={this.state.todoData}
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm onAdd={ this.addItem } />
      </div>
    );
  }
};