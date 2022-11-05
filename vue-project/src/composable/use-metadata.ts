export default function useMetaData() {
    type MetaData = {
        description: String,
        image: String,
        name: String,
        attributes: [{
            display_type: String,
            trait_type: String,
            value: String
        }]
    }
    type QiitaMetaData = {
        description: String
        facebook_id: String,
        followees_count: Number,
        followers_count: Number,
        github_login_name: String,
        id: String,
        items_count: Number,
        linkedin_id: String,
        location: String,
        name: String,
        organization: String,
        permanent_id: Number,
        profile_image_url: String,
        team_only: Boolean,
        twitter_screen_name: String,
        website_url: String
    }
    const formatToMetaData = (json: QiitaMetaData) => {
        const metaData: MetaData = {
            description: json.description,
            image: json.profile_image_url,
            name: json.name,
            attributes: [{
                display_type: "number",
                trait_type: "Followees_count",
                value: "Tomoya Kobayashi"
            }]
        }
        return metaData;
    };

    return {
        formatToMetaData
    }
}