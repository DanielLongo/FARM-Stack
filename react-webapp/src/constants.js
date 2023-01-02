const mode = process.env.REACT_APP_MODE;
// no "/" after api endpoint
let API_ENDPOINT;
if (mode === "dev") {  
  API_ENDPOINT = "http://localhost:8000"; 
} else if (mode === "staging") {
  API_ENDPOINT = "https://farm-stack-service-6cznt6kexa-uc.a.run.app";
} else { // staging
  API_ENDPOINT = "https://farm-stack-service-6cznt6kexa-uc.a.run.app";
}
const GOOGLE_CLIENT_ID = "1020175780794-o8perjgbl8n5kdn99vlblo8gse8nbuvi.apps.googleusercontent.com";
const CAPTHCA_SITE_KEY = "6LcBX74jAAAAAN-cLPyyl4u29NVdIt5FR2UPu1-h";

class Constants {
  static API_ENDPOINT = API_ENDPOINT;
  static GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
  static CAPTHCA_SITE_KEY = CAPTHCA_SITE_KEY;
}

export default Constants;
