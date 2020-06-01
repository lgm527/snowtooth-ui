import React from "react";
import "./App.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { StatusIndicator } from "./StatusIndicator";

const QUERY = gql`
  query {
    allLifts {
      id
      name
      status
    }
  }
`;

const MUTATION = gql`
mutation ($status: LiftStatus! $id:ID!) {
  setLiftStatus(status: $status id: $id) {
    id
    name
    status
  }
}
`;

function App() {
  const { loading, data } = useQuery(QUERY);
  const [setStatus] = useMutation(MUTATION);
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
              <td>
                <StatusIndicator
                status={lift.status}
                onChange={status => setStatus({
                  variables: {
                    id: lift.id,
                    status
                  }
                  })
                }
               />
             </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>;
}

export default App;
