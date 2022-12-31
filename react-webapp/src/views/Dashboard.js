import React from "react";
import { testSecureEndpoint } from "../utils/api";

function Dashboard() {
  return (
    <div>
      <div>
                <h1 className="mt-20 p-4 text-2xl font-bold underline">Dashboard</h1>
                <button onClick={testSecureEndpoint} className="btn-primary">
                    Secure Endpoint
                </button>
            </div>
    </div>
  );
}
export default Dashboard;