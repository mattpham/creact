import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from './components/Home';
import CreateTable from './components/CreateTable';
import ViewTable from './components/ViewTable';

class App extends Component {
  state = {
    tables: []
  };

  createTableHandler = table => {
    // Needs further input validation
    const { tables } = this.state;
    // if(value in table) {
    //   return `Table name ${value} already exists`;
    // } else {
    this.setState({
      tables: [...tables, table]
    });
    // }
    return;
  };
  componentDidMount() {
    this.setState({
      tables: [
        {
          name: 'Test Table',
          columns: [
            { name: 'Column 1' },
            { name: 'Column 2' },
            { name: 'Column 3' }
          ]
        }
      ]
    });
  }
  render() {
    const { tables } = this.state;
    console.log(tables);
    return (
      <div className="w-100 vh-100 flex">
        {/*
          Sidebar
        */}
        <div className="flex w-20 flex-column">
          <Section>
            <Link to="/">Home</Link>
            <button>
              <Link to="/createTable">New Table</Link>
            </button>
          </Section>
        </div>
        {/*         
          Main Content
        */}
        <div className="flex flex-column flex-auto">
          <main>
            <Switch>
              <Route exact path="/" render={() => <Home tables={tables} />} />
              <Route
                path="/createTable"
                render={() => (
                  <CreateTable handleCreateTable={this.createTableHandler} />
                )}
              />
              {/* Route will be changed to /viewTable:id later */}
              <Route
                path="/viewTable/:id"
                render={({ match }) => (
                  <ViewTable table={this.state.tables[match.params.id]} />
                )}
              />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

const Section = props => (
  <section className={props.className ? 'pa3 ' + props.className : 'pa3'}>
    {props.children}
  </section>
);
