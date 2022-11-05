export default function useFacebook() {
    const FACEBOOK_API_URL = "https://graph.facebook.com/";
    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

    const getName = async () => {
        const url = FACEBOOK_API_URL + "me?access_token=" + ACCESS_TOKEN;
        const res = await fetch(url).then(response => response.json()).catch(err => {
            console.error(err);
        });
        if (res) {
            console.log(res);
            return res;
        }
    }
    return {
        getName
    }
}