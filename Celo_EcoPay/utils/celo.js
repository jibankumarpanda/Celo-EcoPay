import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { OdisUtils, WasmBlsBlindingClient } from "@celo/identity";

/**
 * getPhoneIdentifier: returns the on-chain phone identifier (bytes32)
 * using ODIS and a blinding client designed for web.
 *
 * Note: This call consumes ODIS quota. Use in production with rate-limits.
 */
export async function getPhoneIdentifier(provider, phoneNumberE164) {
  const web3 = new Web3(provider);
  const kit = newKitFromWeb3(web3);

  // get ODIS config from contractkit utilities
  const odisUrl = OdisUtils.Query.getOdisUrl(kit.connection.chainId);
  const odisPubKey = await OdisUtils.Query.getOdisPublicKey(odisUrl);

  // Create blinding client depending on runtime (WASM client for web)
  const blsBlindingClient = new WasmBlsBlindingClient(odisPubKey);

  const resp = await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(kit, phoneNumberE164, {
    blsBlindingClient,
  });

  // resp.phoneHash is the bytes32 hex string used on-chain
  return resp.phoneHash;
}
