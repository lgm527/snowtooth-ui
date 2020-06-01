import React from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query {
    allLifts {
      id
      name
      status
    }
  }
`;

function App() {
  const { loading, data } = useQuery(QUERY);
  if (loading) return <p>loading lifts...</p>;

  return <section>
    <h1>Snowtooth Lift Status</h1>
    {data && !loading && (
      <table>
        <thead>
          <tr>
            <th>Lift Name</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {data.allLifts.map(lift => (
            <tr>
              <td>{lift.name}</td>
              <td>{lift.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>;
}

export default App;
