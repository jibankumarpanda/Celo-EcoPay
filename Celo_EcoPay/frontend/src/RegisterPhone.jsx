import React, { useState } from "react";
import { useCelo } from "react-celo";
import { getPhoneIdentifier } from "../utils/celo";
import { ethers } from "ethers";
import PhoneMappingAbi from "../../abi/PhoneMapping.json"; // assume we compile and copy ABI

export default function RegisterPhone({ phoneMappingAddress }) {
  const { kit, address, web3 } = useCelo(); // react-celo provides kit or provider depending on version
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  async function register() {
    if (!phone) return setStatus("enter phone");
    setStatus("computing identifier via ODIS...");
    try {
      // get bytes32 phoneHash
      const phoneHash = await getPhoneIdentifier(web3.currentProvider, phone);
      setStatus("phone identifier obtained: " + phoneHash);

      // call contract
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const signer = provider.getSigner();
      const phoneMapping = new ethers.Contract(phoneMappingAddress, PhoneMappingAbi, signer);

      const tx = await phoneMapping.registerPhone(phoneHash);
      setStatus("tx submitted: " + tx.hash);
      await tx.wait();
      setStatus("registered on-chain!");
    } catch (e) {
      console.error(e);
      setStatus("error: " + (e.message || e));
    }
  }

  return (
    <div>
      <h3>Register Phone</h3>
      <input placeholder="+919876543210" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={register} disabled={!address}>Register</button>
      <div>{status}</div>
    </div>
  );
}
