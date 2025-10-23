import { useState, useEffect } from "react";

// Minimal local replacement for `react-celo` used by this project.
// Exposes: address, web3 (window.ethereum), connect(), kit (null unless initialized)
export default function useCelo() {
  const [address, setAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [kit, setKit] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setWeb3(window.ethereum);
      window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
        if (accounts && accounts.length) setAddress(accounts[0]);
      }).catch(() => {});

      // Listen for account changes
      window.ethereum.on && window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts && accounts.length ? accounts[0] : null);
      });
    }
  }, []);

  async function connect() {
    if (!web3 && typeof window !== "undefined" && window.ethereum) {
      setWeb3(window.ethereum);
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length) setAddress(accounts[0]);
    } catch (e) {
      console.error("wallet connect failed", e);
    }
  }

  return { address, web3, kit, connect };
}
