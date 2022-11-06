import { ref } from "vue";
import { ElMessage } from "element-plus";
import { ethers } from "ethers";
import { contractAddress } from "@/const/contract";
import abi from "@/abi/contract_abi.json";
import type { Contract_abi } from "@/types/ethers-contracts/Contract_abi";

export default function useProvider() {
  const accounts = ref<any>();
  const ethereum = ref<any>();
  const currentTokenId = ref<number>();

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

  const switchEthereumChain = async () => {
    try {
      await ethereum.value.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x5" }]
      })
    } catch (switchError) {
      console.log(switchError);
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
    await getCurrentTokenId(contract);
    return receipt;
  }

  const getCurrentTokenId = async (contract: Contract_abi) => {
    const res = await contract.currentTokenId().catch(err => {
      console.error(err);
    });
    if (res) {
      currentTokenId.value = res.toNumber();
    }
  }

  return {
    ethereum,
    init,
    connectMetamask,
    mintNFT,
    switchEthereumChain,
    currentTokenId
  }
}