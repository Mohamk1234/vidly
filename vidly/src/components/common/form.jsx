import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = (input) => {
    const obj = { [input.id]: input.value };
    const schema = { [input.id]: this.schema[input.id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.id] = errorMessage;
    else delete errors[e.currentTarget.id];
    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.errors[name]}
      />
    );
  };

  renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.errors[name]}
      />
    );
  };
}

export default Form;
