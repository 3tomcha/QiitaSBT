import { ref } from "vue";
import { ElMessage } from "element-plus";
import { ethers } from "ethers";
import { contractAddress } from "@/const/contract";
import abi from "@/abi/contract_abi.json";
import type { Contract_abi } from "@/types/ethers-contracts/index";

export default function useProvider() {
  const accounts = ref<any>();
  const ethereum = ref<any>();

  const init = () => {
    if ((window as any).ethereum) {
      ethereum.value = (window as any).ethereum;
      return true;
    } else {
      ElMessage.error("Metamaskをインストールしてください");
      return false;
    }
  }

  const connectMetamask = async () => {
    const res = await ethereum.value.request({ method: "eth_requestAccounts" });
    if (res) {
      accounts.value = res;
    }
  }

  const mintNFT = async (tokenUri: string) => {
    const provider = new ethers.providers.Web3Provider(ethereum.value);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer) as Contract_abi;
    const recepientAddress = accounts.value[0];
    const receipt = await contract.mintNFT(recepientAddress, tokenUri).catch(err => {
      console.error(err);
    })
    return receipt;

  }

  return {
    ethereum,
    init,
    connectMetamask,
    mintNFT
  }
}