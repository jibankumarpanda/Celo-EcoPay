import React from "react";
import { useCelo } from "react-celo";

export default function WalletConnectButton() {
  const { address, connect } = useCelo();

  return (
    <div>
      {address ? (
        <div>Connected: {address}</div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
