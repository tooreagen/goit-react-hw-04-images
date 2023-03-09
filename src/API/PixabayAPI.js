import axios from 'axios';

export const getImages = async (queryString, page) => {
  const KEY="33034788-7582eefcdc3a32a9d39f881fb"
  const URL=`https://pixabay.com/api/?q=${queryString}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`

  const response = axios.get(URL);
  return {
    hits: (await response).data.hits,
    totalHits: (await response).data.totalHits
  }
};