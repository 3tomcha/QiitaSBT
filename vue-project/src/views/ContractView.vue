<script setup lang="ts">
import { ethers } from "ethers";
import abi from "@/abi/contract_abi.json";
import type { Contract_abi } from "@/types/ethers-contracts/index";
import useQiita from "@/composable/use-qiita";
import { ref } from "vue";
import useIpfs from "@/composable/use-ipfs";
import useMetaData from "@/composable/use-metadata";

const { getProfile } = useQiita();
const { pinJSONToIPFS } = useIpfs();
const { formatToMetaData } = useMetaData();

const qiitaProfile = ref<any>();
const ipfsUrl = ref<string>("");

const getQiitaProfile = async (userName: string) => {
  qiitaProfile.value = await getProfile(userName).catch(err => {
    console.error(err);
  });
};
const uploadToIpfs = async () => {
  const metaData = formatToMetaData(qiitaProfile.value);
  console.log(metaData);
  const res = await pinJSONToIPFS(metaData).catch(err => {
    console.error(err);
  });
  if (res) {
    console.log(res.data.IpfsHash);
    ipfsUrl.value = "ipfs://" + res.data.IpfsHash;
  }
}
const connectAndMint = async () => {
  if ((window as any).ethereum) {
    const ethereum = (window as any).ethereum;
    const acconts = await ethereum.request({ method: "eth_requestAccounts" }).catch(err => {
      console.error(err);
    });
    console.log(acconts);

    const contractAddress = "0xbA3E9C379eAB31f1F98dD9Bf0d78faFe5b2Fe890";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await provider.getSigner();
    const Contract = await new ethers.Contract(contractAddress, abi, signer) as Contract_abi;
    const recepientAddress = "0x5a10d152072832823c38e964E382CD22C00a8d7E";
    const tokenUri = ipfsUrl.value;

    const receipt = await Contract.mintNFT(recepientAddress, tokenUri);
    console.log(receipt);

    // const name = await Contract.name().catch(err => {
    //   console.error(err);
    // });
  }
}
</script>


<template>
  {{ qiitaProfile }}
  <button @click="connectAndMint">connectAndMint</button>
  <button @click="getQiitaProfile('3tomcha')">getName</button>
  <button @click="uploadToIpfs">uploadToIpfs</button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
