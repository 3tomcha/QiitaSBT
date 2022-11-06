import { ref } from "vue";
import type { QiitaMetaData } from "@/types/types";

export default function useQiita() {
    const Qiita_API_URL = "https://qiita.com/api/v2/";
    const qiitaProfile = ref<QiitaMetaData>();

    const getProfile = async (userName: string) => {
        const url = Qiita_API_URL + "users/" + userName;
        const res = await fetch(url).then(response => {
            if (!response.ok) {
                console.error('response.ok:', response.ok);
                console.error('esponse.status:', response.status);
                console.error('esponse.statusText:', response.statusText);
                alert("ユーザーが見つかりませんでした");
                throw new Error(response.statusText);
            }
            return response.json()
        }).catch(err => {
            console.error(err);
        });
        if (res) {
            console.log(res);
            qiitaProfile.value = res;
        }
    }
    return {
        qiitaProfile,
        getProfile
    }
}