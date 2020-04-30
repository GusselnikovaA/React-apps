import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.sass';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Build Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  };

  createTodoItem(label) {
    return {
      label, 
      important: false, 
      done: false,
      id: this.maxId++}
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
  };

  addItem = (text) => {
    this.setState( ({todoData}) => {
      const newItem = this.createTodoItem(text);
      const newTodoData = [ 
        ...todoData,
       newItem
      ];

      return {
        todoData: newTodoData
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { 
      ...oldItem, 
      [propName]: !oldItem[propName] 
    };

    return  [
      ...arr.slice(0, idx), 
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      const newTodoData = this.toggleProperty(todoData, id, 'important');

      return {
        todoData: newTodoData
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const newTodoData = this.toggleProperty(todoData, id, 'done');

      return {
        todoData: newTodoData
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  };

  searchItem = (term) => {
    this.setState({term})
  };

  render() {
    const { todoData, term } = this.state;

    const visibleItems = this.search(todoData, term);
    const doneCount = todoData
                        .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel onSearched={ this.searchItem }/>
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm onAdded={ this.addItem } />
      </div>
    );
  };
};