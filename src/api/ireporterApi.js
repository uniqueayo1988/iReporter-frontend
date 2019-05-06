import axios from 'axios';

export default axios.create({
  baseURL: 'https://andela-ireporter.herokuapp.com/api/v1'
});
