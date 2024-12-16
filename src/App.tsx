import { useState } from 'react'
import { DimoAuthProvider, useDimoAuthState } from "@dimo-network/login-with-dimo";
import { initializeDimoSDK } from "@dimo-network/login-with-dimo";
import { LoginWithDimo, ShareVehiclesWithDimo } from "@dimo-network/login-with-dimo";
import './App.css'

// Initialize SDK once, outside of component
initializeDimoSDK({
  clientId: "0xeAa35540a94e3ebdf80448Ae7c9dE5F42CaB3481",
  redirectUri: "http://localhost:8082",
});

// Create a separate component for the authenticated content
function AuthenticatedContent() {
  const { 
    isAuthenticated,
    getValidJWT,
    getEmail,
    email,
    walletAddress
  } = useDimoAuthState();

  return (
    <>
      <LoginWithDimo
        mode="popup"
        onSuccess={(authData) => console.log("Success:", authData)}
        onError={(error) => console.error("Error:", error)}
      />
       <ShareVehiclesWithDimo
          mode="popup"
          onSuccess={(authData) => console.log("Success:", authData)}
          onError={(error) => console.error("Error:", error)}
          //REQUIRED: "1" is the template for all SACD permissions
          permissionTemplateId={"1"}
          // OPTIONAL, specify vehicles (uncomment the line below to use it)
          // vehicles={["585","586"]}  // Specify the vehicles to be accessed when triggered   
      />      
      {/* <p>Test</p>
      <p>Is Authenticated: {isAuthenticated?.toString()}</p>
      <p>JWT: {getValidJWT?.toString()}</p>
      <p>Get Email: {getEmail?.toString()}</p>
      <p>Email: {email}</p>
      <p>Wallet Address: {walletAddress}</p> */}
    </>
  );
}

// Main App component
function App() {
  return (
    <DimoAuthProvider>
      <h1>Share Vehicles with Rentality:</h1>
      <AuthenticatedContent />
    </DimoAuthProvider>
  );
}

export default App