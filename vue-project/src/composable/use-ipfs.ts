import axios from "axios";

export default function useIpfs() {

    const pinJSONToIPFS = async () => {
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
            "pinataContent": {
                "somekey": "somevalue"
            }
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
        const res = await axios(config);
        console.log(res);
        return res;
    }

    return {
        pinJSONToIPFS
    }
}