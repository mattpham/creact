import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// TODO: Add validation for duplicates and empty columns
class CreateTable extends Component {
  state = {
    name: '',
    columns: [],
    error: '',
    redirect: false
  };
  /*
    Form Handlers
  */
  // Table Name
  handleChangeName = event => {
    const { value } = event.target;
    this.setState({
      name: value
    });
  };
  // Table Columns
  handleAddColumn = () => {
    const { columns } = this.state;
    this.setState({
      columns: [
        ...columns,
        {
          name: ''
        }
      ]
    });
  };
  handleRemoveColumn = index => () => {
    const { columns } = this.state;
    this.setState({
      columns: [...columns.slice(0, index), ...columns.slice(index + 1)]
    });
  };
  handleChangeColumn = index => event => {
    const { value } = event.target;
    const { columns } = this.state;
    this.setState({
      columns: [
        ...columns.slice(0, index),
        { name: value },
        ...columns.slice(index + 1)
      ]
    });
  };
  // Form Submit
  handleSubmit = ev => {
    ev.preventDefault();
    const { name, columns } = this.state;
    this.props.handleCreateTable({ name, columns });
    // if (ret) {
    //   alert(ret);
    //   this.setState({ error: ret });
    // } else {
    //   this.setState({
    //     error: '',
    //     redirect: true
    //   });
    // }
  };
  render() {
    const { columns, error, redirect } = this.state;
    return (
      <div>
        <h2>Create New Table</h2>
        <div>{error ? <span>{error}</span> : ''}</div>
        <div>{redirect ? <Redirect to="/" /> : ''}</div>
        {/* 
          Form
        */}
        <form onSubmit={this.handleSubmit} className="pa3 flex flex-column">
          {/* 
            Table Name
          */}
          <label>
            <h4>Name</h4>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </label>
          {/* 
            Columns
          */}
          <label>
            <h4>Table Columns</h4>
          </label>
          {columns.map((name, index) => (
            <div key={index}>
              <input
                type="text"
                name="column"
                value={this.state.columns[index].name}
                onChange={this.handleChangeColumn(index)}
              />
              <button type="button" onClick={this.handleRemoveColumn(index)}>
                Remove Column
              </button>
            </div>
          ))}

          <button type="button" onClick={this.handleAddColumn}>
            Add Column
          </button>
          <input type="submit" value="Create Table" />
        </form>
      </div>
    );
  }
}

export default CreateTable;
