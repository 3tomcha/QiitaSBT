import axios from "axios";
import { ref } from "vue";

export default function useIpfs() {
    const ipfsUrl = ref<string>("");

    const pinJSONToIPFS = async (content: Object) => {
        const data = JSON.stringify({
            "pinataOptions": {
                "cidVersion": 1
            },
            "pinataMetadata": {
                "name": "testing",
                "keyvalues": {
                    "customKey": "customValue",
                    "customKey2": "customValue2"
                }
            },
            "pinataContent": content
        });

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                'Content-Type': 'application/json',
                "pinata_api_key": import.meta.env.VITE_PINATA_API_KEY,
                "pinata_secret_api_key": import.meta.env.VITE_PINATA_SECRET_API_KEY,
            },
            data: data
        };
        const res: any = await axios(config).catch(err => {
            console.error(err);
        });
        if (res) {
            console.log(res);
            ipfsUrl.value = "ipfs://" + res.data.IpfsHash
        }
    }

    return {
        ipfsUrl,
        pinJSONToIPFS
    }
}