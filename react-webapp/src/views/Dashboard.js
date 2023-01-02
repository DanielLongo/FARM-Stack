import React from "react";
import useFetch from "../utils/useFetch";
import { API_ENDPOINT } from "../constants";

function Dashboard() {
  const { refreshFetch, fetchIsLoading } = useFetch();
  const [email, setEmail] = React.useState("");
  const testSecureEndpoint = async () => {
    const response = await refreshFetch("/users/secret", {
      method: "GET",
    });
    const json = await response.json();
    setEmail(json.email);
  };

  return (
    <div>
      <div>
        <h1 className="mt-20 p-4 text-2xl font-bold underline">Dashboard</h1>
        <div className="flex flex-row">
          <button onClick={testSecureEndpoint} className="btn-primary mr-4">
            Secure Endpoint
          </button>
          <button onClick={() => setEmail("")} className="btn-secondary">
            Clear
          </button>
        </div>
        <p>{fetchIsLoading ? "Loading..." : email}</p>
      </div>
    </div>
  );
}
export default Dashboard;
