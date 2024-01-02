
import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';


const API_KEY = '40580294-4a69e721af793c687d9c3316d';

export const perPage = 12;


export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};


export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });