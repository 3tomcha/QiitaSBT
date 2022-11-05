export default function useQiita() {
    const Qiita_API_URL = "https://qiita.com/api/v2/";

    const getProfile = async (userName: string) => {
        const url = Qiita_API_URL + "users/" + userName;
        const res = await fetch(url).then(response => response.json()).catch(err => {
            console.error(err);
        });
        if (res) {
            console.log(res);
            return res;
        }
    }
    return {
        getProfile
    }
}