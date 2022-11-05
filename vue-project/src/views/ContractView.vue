<script setup lang="ts">
import { ethers } from "ethers";
import abi from "@/abi/contract_abi.json";
import type { Contract_abi } from "@/types/ethers-contracts/index";

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
  const recepientAddress = "0x32a9E70324862ef7BF8bA7610AF701822ddE5364";
  const tokenUri = "https://gateway.pinata.cloud/ipfs/QmTFCG9UPu5gfa2edbXEZVcr6BLu8NLzV14DWCLsedNFUd";

  const receipt = await Contract.mintNFT(recepientAddress, tokenUri);
  console.log(receipt);

  // const name = await Contract.name().catch(err => {
  //   console.error(err);
  // });
}
</script>


<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>aa</h2>
  </div>
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
