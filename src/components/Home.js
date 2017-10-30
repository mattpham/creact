import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ tables }) => (
  <div>{tables.length ? TableList(tables) : <div>No Tables Here</div>}</div>
);

const TableList = tables => (
  <ul>
    {tables.map((table, index) => (
      <li key={index}>{`${table.name} - Cols: ${table.columns.length}`} <Link to={`viewTable/${index}`}>View Table</Link></li>
    ))}
  </ul>
);

export default Home;
