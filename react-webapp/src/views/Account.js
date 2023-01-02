import React, {useState} from "react";
import useFetch from "../utils/useFetch";
function Account() {
  const { refreshFetch } = useFetch();
  const [userDetails, setUserDetails] = useState(null);
  const getUserDetails = async () => {
    let response = await refreshFetch("/users/me", {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      setUserDetails(data);
      console.log("data", data);
    }
  };
  React.useEffect(() => {
    getUserDetails();
  }, []);
  console.log("userDetails", userDetails);


  return (
    <div>
      <h1>Account</h1>
      {userDetails ? (
        <div>
          <p>email: {userDetails.email}</p>
          <p>account type: {userDetails.account_type}</p>
          </div>
      ) : (
        <div>
          <p>loading...</p>
        </div>
      )}
    </div>
  );
}

export default Account;
