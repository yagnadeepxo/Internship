
import './App.css';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal,Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";


function App() {
  const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "51da82e9eb9b661de3fe5c7b70c6fe10" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "51da82e9eb9b661de3fe5c7b70c6fe10",
    version: "2", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
return (
  <div className="App">
    <WagmiConfig client={wagmiClient}>
    <h1>web3</h1>
    </WagmiConfig>
    <Web3Button />
    <Web3Modal
      projectId="51da82e9eb9b661de3fe5c7b70c6fe10"
      ethereumClient={ethereumClient}
    />
    
  </div>
);

}

export default App;


// import { useState, useEffect } from "react";
// import { SignClient } from "@walletconnect/sign-client";
// import { Web3Modal } from "@web3modal/standalone";
// import "./App.css";

// function App() {
//   const [signClient, setSignClient] = useState();
//   const [session, setSession] = useState([]);
//   const [account, setAccount] = useState([]);
//   const [url,seturl] = useState("")

//   async function createClient() {
//     try {
//       const signClient = await SignClient.init({
//         projectId: "51da82e9eb9b661de3fe5c7b70c6fe10",
//       });
//       setSignClient(signClient);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   useEffect(() => {
//     if (!signClient) {
//       createClient();
//     }
//   }, [signClient]);

//   const web3Modal = new Web3Modal({
//     projectId: "51da82e9eb9b661de3fe5c7b70c6fe10",
//     standaloneChains: ["eip155:5"]
//   })

//   async function handleConnect(){
//     if (!signClient) throw Error("SignClient does not exist");
    
//     const proposalNamespace = {
//       eip155: {
//           methods: ["eth_sendTransaction"],
//           chains: ["eip155:5"],
//           events: ["connect", "disconnect"]
//         }
//       }
  
//     const { uri,approval } = await signClient.connect({
//       requiredNamespaces: proposalNamespace
//     });
    
  
//     if (uri){
//       web3Modal.openModal({ uri });
//     }
//     const sessionNamespace = await approval();
//     onSessionConnected(sessionNamespace);
//     web3Modal.closeModal();
//     try {
//     } catch(e){
//       console.log(e);
//     }
//   }
//   async function onSessionConnected(session){
//     console.log("Session object:", session); 
//     try {
//       setSession(session);
//       setAccount(session.namespaces.eip155.accounts[0].slice(9));
//       console.log(account)

//     } catch(e){
//       console.log(e)
//     }
//   }

//   return (
//     <div className="App">
//       <h1>Sign v2 Standalone</h1>
//       <button onClick={handleConnect} disabled={!signClient}>
//         Connect
//       </button>
//       <h1>{url}</h1>
//     </div>
//   );
// }

// export default App;




  