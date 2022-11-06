# プロジェクト概要
「アウトプット・賞賛をNFTでさらに自慢しちゃおう！ 〜 Qiitaの情報をもとにNFTを作成、Metamaskに持てます、Openseaで表示できます 〜 」

## きっかけ
NFTは、ただ所持するだけでなく、それを自己表現に使うケースが増えてきています。  
私の身の回りでも好きなNFTをTwitterのiconにしたりして、そのNFTが好きな人どうしの会話やコミュニティの形成がされています。
そこで、エンジニア界隈で有力なコミュニティである「Qiita」をターゲットに考えてみると、フォロワーの多さだったり、自分の投稿だったりと、
他の人にアピールしたい要素が多く含まれていることがわかりました。これはNFTに向いていると考え、開発に着手しました。

## 機能
これから書きます

## フォルダ構成
- vue-project/src/App.vue
メインの処理を行う箇所です
https://github.com/3tomcha/QiitaSBT/blob/master/vue-project/src/composable/use-ipfs.ts
pinataAPIを通して、JSONデータをIPFSにアップします
- vue-project/src/composable/use-metadata.ts
QiitaAPIから返ってくるAPIの型を、OpenseaのMetaDataの型に変換します
- vue-project/src/composable/use-provider.ts 
Metamaskやスマートコントラクトが関係する処理です
・init 
初期化の処理です
・connectMetamask
メタマスクに接続します
・switchEthereumChain
別のネットワークidに繋げてしまっている場合に、Goerliネットワークに変更します
・mintNFT
tokenURIをもとにNFTをmintします
・getCurrentTokenId
現在のトークンIDを取得します
- vue-project/src/composable/use-qiita.ts 
QiitaAPIを通して、Qiitaのユーザー名からプロフィールを取得します

## 工夫した点
これから書きます

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
ContractAddress
0xbA3E9C379eAB31f1F98dD9Bf0d78faFe5b2Fe890
エクスプローラーへのリンク

## application codeやその他のfile
srcフォルダ内にあります

## テスト手順を含むリポジトリへのリンク

## 審査やテストのためにプロジェクトにアクセスする方法など
