<script setup lang="ts">
import useFacebook from "@/composable/use-facebook";
import useQiita from "@/composable/use-qiita";
import useIpfs from "@/composable/use-ipfs";
// const { getName } = useFacebook();
const { getProfile } = useQiita();
// const { pinJSONToIPFS } = useIpfs();
// const json = {
//   "attributes": [
//     {
//       "trait_type": "name",
//       "value": "Tomoya Kobayashi"
//     }
//   ]
// };
</script>
<template>
  <div class="about">
    <button @click="getProfile('3tomcha')">getName</button>
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
