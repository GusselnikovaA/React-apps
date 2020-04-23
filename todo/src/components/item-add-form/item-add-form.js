import React, {Component} from 'react';

import './item-add-form.sass';

export default class ItemAddForm extends Component {

  render() {
    const { onAdd } = this.props;
    const input = document.querySelector('.add-input');

    return (
      <form className='d-flex item-add-form'>
        <input type="text"
              className="form-control add-input"
              placeholder='What do you want to do?' />
        <button type='button'
                className='btn btn-info'
                onClick={ () => onAdd('input.value') }>Add</button>
      </form>
    );
  }
};