import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewTable extends Component {
  props = {
    table: PropTypes.shape({
      name: PropTypes.string,
      columns: PropTypes.array
    })
  };
  state = {
    entries: [],
    edits: {}
  };

  handleChange = ev => {
    const { newEntry } = this.state;
    this.setState({
      newEntry: {
        ...newEntry,
        [ev.target.name]: ev.target.value
      }
    });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    const { entries, newEntry } = this.state;
    this.setState({
      entries: [...entries, newEntry]
    });
  };
  handleDelete = index => () => {
    const { entries } = this.state;
    this.setState({
      entries: [...entries.slice(0, index), ...entries.slice(index + 1)]
    });
  };
  handleEdit = index => () => {
    const { edits, entries } = this.state;
    this.setState({
      edits: {
        ...edits,
        [index]: entries[index]
      }
    });
  };
  handleChangeEdit = index => ev => {
    console.log(ev.target.name, '=', ev.target.value);
    const { edits } = this.state;
    const editEntry = {
      ...edits[index],
      [ev.target.name]: ev.target.value
    };
    this.setState({
      edits: {
        ...edits,
        [index]: editEntry
      }
    });
  };
  handleSaveEdit = index => () => {
    const { entries, edits } = this.state;
    const saveEntry = edits[index];
    this.setState({
      entries: [
        ...entries.slice(0, index),
        saveEntry,
        ...entries.slice(index + 1)
      ]
    });
    delete edits[index];
  };
  render() {
    const table = this.props.table;
    const { entries, edits } = this.state;
    if (!table) {
      return <div>Can't find table</div>;
    }
    return (
      <div>
        <h2>View Table</h2>
        <h4>{table.name}</h4>
        <form onSubmit={this.handleSubmit}>
          {table.columns.map(column => (
            <label key={column.name}>
              {column.name}{' '}
              <input
                type="text"
                name={column.name}
                onChange={this.handleChange}
              />
            </label>
          ))}
          <input type="submit" value="Add" />
        </form>
        <table>
          <thead>
            <tr>
              {table.columns.map(column => (
                <th key={column.name}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              if (index in edits) {
                return (
                  <tr key={index}>
                    {table.columns.map(column => (
                      <td>
                        <input
                          type="text"
                          onChange={this.handleChangeEdit(index)}
                          value={edits[index][column.name]}
                          name={column.name}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={this.handleSaveEdit(index)}>Save</button>
                    </td>
                    <td>
                      <button onClick={this.handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    {table.columns.map(column => (
                      <td>{entry[column.name] || 'N/A'}</td>
                    ))}
                    <td>
                      <button onClick={this.handleEdit(index)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={this.handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Row Count: {entries.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default ViewTable;
