import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';

//common
import Input from '../common/Input';

export default class Form extends Component {
  state = { data: {}, error: {} };

  onValidate = ({ name, value }) => {
    const body = { [name]: value };
    const { error } = Joi.validate(body[name], this.schema[name]);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ target }) => {
    const errors = { ...this.state.error };
    const data = { ...this.state.data };

    const errorMessage = this.onValidate(target);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    this.setState({
      data: { ...data, [target.name]: target.value },
      errors: { ...errors }
    });
  };

  validate = () => {
    const { data } = this.state;

    //Getting the error properties of the validation
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    //if no errors exists, exit the function
    if (!error) return '';

    //create an object to store each errors
    const errors = {};

    //Get the items in the error.details
    // error.details returns a list of objects
    //return an objects
    error.details.map(err => (errors[err.path[0]] = err.message));
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) return;

    this.doSubmit();
  };

  renderHeader = (primary, secondary) => {
    return (
      <Fragment>
        <h1>{primary}</h1>
        <p className='lead'>{secondary}</p>
      </Fragment>
    );
  };

  renderInput = (name, placeholder, icon, type = 'text') => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name] && data[name]}
        onChange={this.handleChange}
        placeholder={placeholder}
        icon={icon}
        type={type}
        error={errors[name]}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        disabled={this.validate()}
        type='submit'
        className='btn btn-primary'
      >
        {label}
      </button>
    );
  };
}
