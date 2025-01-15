import { selector, selectorFamily } from "recoil";
import axios from "axios";
import { Movie } from "@/types/types";

export const moviesDBSelectorQuery = selector<Movie[]>({
  key: 'MoviesDBSelector',
  get: async () => {
    try {
        const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
        return response.data.map((item: any) => item.show); 
    } catch (error) {
        throw error;
    } 
}
});




// export const moviesDBSelectorQuery = atom<Movie[]>({
//     key: "MoviesDBSelector",
//     default: [{id:1, name: "hey",network:{name: "hello"}}]
// })