import api from "@/lib/axiosApi";

export const albumServices ={
    createAlbum : async (title: String, photographerId: String, clientId: String)=>{
        const payload = {
            title, photographerId, clientId
        }
        return api.post("/album/create", payload);

    }
}