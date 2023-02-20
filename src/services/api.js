import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33058317-2be3cc902f47206f95f4430ca';

export const requestImages = async (value, page) => {
  const params = {
    key: API_KEY,
    page,
    per_page: 12,
    orientation: 'horizontal',
    q: value
  };

  try {
    const { data } = await axios.get(BASE_URL, { params });

    const { hits, totalHits } = data;
    const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }))
    const totalImages = totalHits;
    return { images, totalImages };

  } catch (error) {
    throw new Error(error);
  }
}