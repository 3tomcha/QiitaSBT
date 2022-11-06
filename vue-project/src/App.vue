<script setup lang="ts">
import useQiita from "@/composable/use-qiita";
import { ref, computed } from "vue";
import useIpfs from "@/composable/use-ipfs";
import useMetaData from "@/composable/use-metadata";
import useProvider from "@/composable/use-provider";
import { ElMessage } from "element-plus";
import type { TxReceipt } from "@/types/types";
import { contractAddress } from "@/const/contract";

const { qiitaProfile, getProfile } = useQiita();
const { ipfsUrl, pinJSONToIPFS } = useIpfs();
const { formatToMetaData } = useMetaData();
const { init, connectMetamask, mintNFT, switchEthereumChain, currentTokenId } = useProvider();

const input = ref<string>();
const dialogVisible = ref<Boolean>();
const txReceipt = ref<TxReceipt>();

const getQiitaProfile = async () => {
  const userName = input.value;
  if (!userName) {
    alert("ユーザー名が入力されていません。");
    return;
  }
  await getProfile(userName).catch(err => {
    console.error(err);
  });
};

const uploadToIpfs = async () => {
  if (qiitaProfile.value) {
    const metaData = formatToMetaData(qiitaProfile.value);
    console.log(metaData);
    const res = await pinJSONToIPFS(metaData).catch(err => {
      console.error(err);
    });
  }
}

const connectAndMint = async () => {
  const success = init();
  if (!success) {
    return ElMessage.error("Metamaskをインストールしてください");
  }
  await connectMetamask();
  await switchEthereumChain();
  const receipt = await mintNFT(ipfsUrl.value);
  if (receipt) {
    console.log(receipt);
    dialogVisible.value = true;
    txReceipt.value = receipt;
  }
}

const txExplorerURL = computed(() =>
  txReceipt.value ? `https://goerli.etherscan.io/tx/${txReceipt.value.hash} ` : ""
)

const submit = async () => {
  await uploadToIpfs();
  await connectAndMint();
}
</script>


<template>
  <main>
    <h1><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.57 130" fill="white">
        <circle cx="167.08" cy="21.4" r="12.28"></circle>
        <path d="M250.81 29.66h23.48v18.9h-23.48z"></path>
        <path
          d="M300.76 105.26a22.23 22.23 0 01-6.26-.86 12.68 12.68 0 01-5.17-3 14.41 14.41 0 01-3.56-5.76 28 28 0 01-1.3-9.22V48.56h29.61v-18.9h-29.52V3.29h-20.17v83.34q0 11.16 2.83 18.27a27.71 27.71 0 007.7 11.2 26.86 26.86 0 0011.43 5.62 47.56 47.56 0 0012.34 1.53h15.16v-18zM0 61.7a58.6 58.6 0 015-24.21A62.26 62.26 0 0118.73 17.9 63.72 63.72 0 0139 4.78 64.93 64.93 0 0164 0a65 65 0 0124.85 4.78 64.24 64.24 0 0120.38 13.12A62 62 0 01123 37.49a58.6 58.6 0 015 24.21 58.34 58.34 0 01-4 21.46 62.8 62.8 0 01-10.91 18.16l11.1 11.1a10.3 10.3 0 010 14.52 10.29 10.29 0 01-14.64 0l-12.22-12.41a65 65 0 01-15.78 6.65 66.32 66.32 0 01-17.55 2.3 64.63 64.63 0 01-45.23-18A62.82 62.82 0 015 85.81 58.3 58.3 0 010 61.7zm21.64.08a43.13 43.13 0 0012.42 30.63 42.23 42.23 0 0013.43 9.09A41.31 41.31 0 0064 104.8a42 42 0 0030-12.39 42.37 42.37 0 009-13.64 43.43 43.43 0 003.3-17 43.77 43.77 0 00-3.3-17A41.7 41.7 0 0080.55 22 41.78 41.78 0 0064 18.68 41.31 41.31 0 0047.49 22a42.37 42.37 0 00-13.43 9.08 43.37 43.37 0 00-12.42 30.7zM331.89 78a47.59 47.59 0 013.3-17.73 43.22 43.22 0 019.34-14.47A44.25 44.25 0 01359 36a47.82 47.82 0 0118.81-3.58 42.72 42.72 0 019.26 1 46.5 46.5 0 018.22 2.58 40 40 0 017 3.84 44.39 44.39 0 015.71 4.63l1.22-9.47h17.35v85.83h-17.35l-1.17-9.42a42.54 42.54 0 01-5.84 4.67 43.11 43.11 0 01-7 3.79 44.86 44.86 0 01-8.17 2.59 43 43 0 01-9.22 1A47.94 47.94 0 01359 119.9a43.3 43.3 0 01-14.47-9.71 44.17 44.17 0 01-9.34-14.47 47 47 0 01-3.3-17.72zm20.27-.08a29.16 29.16 0 002.17 11.34 27 27 0 005.92 8.88 26.69 26.69 0 008.76 5.76 29.19 29.19 0 0021.44 0 26.11 26.11 0 008.72-5.76 27.57 27.57 0 005.88-8.84 29 29 0 002.16-11.38 28.62 28.62 0 00-2.16-11.22 26.57 26.57 0 00-5.93-8.8 27.68 27.68 0 00-19.51-7.9 28.29 28.29 0 00-10.77 2.05 26.19 26.19 0 00-8.71 5.75 27.08 27.08 0 00-5.84 8.8 28.94 28.94 0 00-2.13 11.31zm-194.97-30.5h19.78v73.54h-19.78zm49.25 0h19.78v73.54h-19.78z">
        </path>
        <circle cx="216.33" cy="21.4" r="12.28"></circle>
      </svg>をNFTに変換</h1>
    <article>
      <h2>Qiitaのプロフィール情報をもとにNFTを作成します。</h2>
    </article>

    <template v-if="!txExplorerURL">
      <input type="text" placeholder="Qiitaのユーザーid" v-model="input" />
      <el-button type="info" class="submit" plain @click="getQiitaProfile">Submit</el-button>
      <div v-if="qiitaProfile" class="profile">
        <p>ユーザーが見つかりました</p>
        <textarea disabled class="result">
      {{ qiitaProfile }}
    </textarea>
      </div>
      <el-button type="danger" class="transform" @click="submit" v-if="qiitaProfile">Transform</el-button>
    </template>

    <div v-if="txExplorerURL">
      <p>トランザクション</p>
      <a :href="txExplorerURL">{{ txExplorerURL }}</a>
      <p>
        SP版のMetamaskのNFTをインポートから下記の内容を入力すると、トークンをみることができます
      </p>

      <textarea disabled class="result">
アドレス:
{{ contractAddress }}

ID:
{{ currentTokenId }} 
      </textarea>
    </div>

  </main>
  <el-dialog v-model="dialogVisible" title="Succeeded" width="96%">
    <span>NFTに変換できました</span>
    <p>{{ txReceipt }}</p>
    <p>トランザクション</p>
    <a :href="txExplorerURL">{{ txExplorerURL }}</a>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          閉じる
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
html {
  background-color: #55c500;
}

main {
  padding: 2%;
  display: flex;
  flex-flow: column;
  min-height: 80vh;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  row-gap: 8px;

  svg {
    height: 60px;
  }

  h1 {
    display: flex;
    align-items: baseline;
    font-size: 26px;
    column-gap: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    font-size: 20px;
    color: white;
  }

  input {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    border-radius: 5px;
    line-height: 22px;
    border: 2px solid white;
    transition: all 0.3s;
    padding: 13px;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
  }

  .submit {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    font-family: Helvetica, Arial, sans-serif;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    height: 2em;
    margin-top: 8px;
    border: 3px solid;
  }

  .transform {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    font-family: Helvetica, Arial, sans-serif;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    height: 2em;
    margin-top: 8px;
  }

  textarea {
    height: 35em;
    background: white;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  input,
  textarea {
    -webkit-appearance: none;
  }

  .profile {
    margin-top: 20px;
  }

  @media screen and (min-width: 1300px) {
    width: 1080px;
  }

  a {
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .result {
    background: white;
  }

  textarea:disabled {
    background: white !important;
  }

  input {
    opacity: 1;
  }
}
</style>
