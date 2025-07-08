import axios from 'axios';

const API_BASE_URL = 'https://slither-backend.vercel.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/session', { email, password }),
  
  register: (userData: any) =>
    api.post('/user', userData),
};

// Game endpoints
export const gameAPI = {
  startGame: (valueGame: number) =>
    api.put('/start', { valueGame }),
  
  killEnemy: () =>
    api.put('/kill'),
};

// Room endpoints
export const roomAPI = {
  createRoom: (max_users: number, value_room: number) =>
    api.post('/room', { max_users, value_room }),
  
  finishRoom: (room_id: string) =>
    api.delete('/room', { data: { room_id } }),
  
  addUser: (room_id: string) =>
    api.put('/add_user', { room_id }),
  
  removeUser: (room_id: string) =>
    api.put('/remove_user', { room_id }),
};