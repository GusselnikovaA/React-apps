import React, {Component} from 'react';

import './item-add-form.sass';

export default class ItemAddForm extends Component {
  state = {
    label: ''
  };

  onLabelChange = (e)=> {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label !== '') {
      this.props.onAdded(this.state.label);
      this.setState({
        label: ''
      });
    }
  };

  render() {
    return (
      <form className='d-flex item-add-form'
            onSubmit={ this.onSubmit }>
        <input type="text"
              className="form-control add-input"
              placeholder='What do you want to do?'
              onChange={ this.onLabelChange }
              value={ this.state.label } />
        <button className='btn btn-info'>Add</button>
      </form>
    );
  }
};