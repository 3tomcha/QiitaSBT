# プロジェクト概要
「QiitaSBT 〜アウトプット・賞賛をNFTでさらに自慢しちゃおう！Qiitaの情報をもとにNFTを作成、Metamaskに持てます、Openseaで表示できます〜」

## きっかけ
NFTは、ただ所持するだけでなく、それを自己表現に使うケースが増えてきています。<br>
私の身の回りでも好きなNFTをTwitterのiconにしたりして、そのNFTが好きな人どうしの会話やコミュニティの形成がされています。<br>
そこで、エンジニア界隈で有力なコミュニティである「Qiita」をターゲットに考えてみると、フォロワーの多さだったり、自分の投稿だったりと、
他の人にアピールしたい要素が多く含まれていることがわかりました。これはNFTに向いていると考え、開発に着手しました。

## 推奨環境
PC: Chrome最新版<br>
SP: Metamaskブラウザ最新版<br>

## 使い方
https://3tomcha.github.io/QiitaSBT/
- Qiitaのユーザーidを入力します<br>
<img width="1440" alt="スクリーンショット 2022-11-06 17 26 38" src="https://user-images.githubusercontent.com/15997287/200161316-aa3b3adf-4518-4261-9a5c-1baa79df6585.png"><br>
- ユーザーが見つかるとプロフィール情報が表示されます。Transformボタンをクリックします<br>
<img width="1440" alt="スクリーンショット 2022-11-06 17 26 54" src="https://user-images.githubusercontent.com/15997287/200161334-8c577000-60ed-4b5b-8f1c-81ae231ad6cb.png"><br>
- Metamaskが反応します。確認ボタンをクリック、その後、承認をクリックします<br>
<img width="1439" alt="スクリーンショット 2022-11-06 17 27 11" src="https://user-images.githubusercontent.com/15997287/200161382-14e2f374-358f-417d-9180-840c26c5e06a.png">
- 成功するとメッセージが表示されます。リンクをクリックするとEtherscanへとびます<br>
<img width="1440" alt="スクリーンショット 2022-11-06 17 27 21" src="https://user-images.githubusercontent.com/15997287/200161483-0666359b-aa56-4f9d-ac71-26c24c8de037.png">
- Dialogを閉じると、コントラクトアドレスとトークンIDを見ることができます。それらを、SP版のMetamaskのNFTをインポートから入力するとNFTを見ることができます。<br>
<img width="1440" alt="スクリーンショット 2022-11-06 17 27 32" src="https://user-images.githubusercontent.com/15997287/200161526-70192747-709c-49cc-9925-5c28ae7bdc33.png">
- TestNet版Openseaに、SP版のMetamaskを接続すると、詳細な属性値を見ることができます<br>
https://testnets.opensea.io/ja
<div>
<video src="https://user-images.githubusercontent.com/15997287/200162792-665fcbb3-85d4-422c-80d8-0b74a7db6328.mov"><br>
</div>

## フォルダ構成
- contracts<br>
  - MyNFT.sol<br>
    スマートコントラクトです。TransferできないSBTを生成します。<br>
    - constructor<br>
      初期化処理です
    - currentTokenId<br>
      現在のTokenIdを取得します<br>
    - mintNFT<br>
      NFTをmintします<br>
    - burn<br>
      NFTをburnします<br>持ち主しかできないようにしています
    - _beforeTokenTransfer<br>
      NFTをTransferする前の処理です<br>持ち主でもTransferできません
      
- vue-project<br>
フロントエンドコードのディレクトリです<br>
  - src<br>
    - App.vue<br>
      メインの処理を行う箇所です
    - composable<br>
      - [use-ipfs.ts](https://github.com/3tomcha/QiitaSBT/blob/master/vue-project/src/composable/use-ipfs.ts)<br>
        pinataAPIを通して、JSONデータをIPFSにアップします<br>
      - [use-metadata.ts](https://github.com/3tomcha/QiitaSBT/blob/master/vue-project/src/composable/use-metadata.ts)<br>
        QiitaAPIから返ってくるJSONの型を、OpenseaのMetaDataの型に変換します<br>
      - [use-provider.ts](https://github.com/3tomcha/QiitaSBT/blob/master/vue-project/src/composable/use-provider.ts)<br>
        Metamaskやスマートコントラクトが関係する処理です<br>
        ・init<br>
        初期化の処理です<br>
        ・connectMetamask<br>
        メタマスクに接続します<br>
        ・switchEthereumChain<br>
        別のネットワークidに繋げてしまっている場合に、Goerliネットワークに変更します<br>
        ・mintNFT<br>
        tokenURIをもとにNFTをmintします<br>
        ・getCurrentTokenId<br>
        現在のトークンIDを取得します<br>
      - [use-qiita.ts](https://github.com/3tomcha/QiitaSBT/blob/master/vue-project/src/composable/use-qiita.ts)<br>
        QiitaAPIを通して、Qiitaのユーザー名からプロフィールを取得します<br>

## 工夫した点
### SoulBoundTokenの導入
・ただのERC721ではなく、譲渡不可能なSoulBoundTokenで実装しました。
### Opensea上でMetadataを見ることができる
・Metadata Standardsをもとに、Metadataを作成しました
https://docs.opensea.io/docs/metadata-standards

## ローカルでの動作方法
```shell
cd vue-project
npm run dev
```

## 使用したtech stacks
Solidity, IPFS, TypeScript, Vue3, Ethers.js, Typechain

## 使用したBlockchain
イーサリアム（Goerli）

## deployしたContract
ContractAddress<br>
0xbA6268EeBC71c9b110cDF3929637f8a39Eb3A758
Etherscan(Goerli)<br>
https://goerli.etherscan.io/address/0xbA6268EeBC71c9b110cDF3929637f8a39Eb3A758
