export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  cash: number;
  token: string;
}

export interface Room {
  id: string;
  value_room: number;
  max_users: number;
  number_users: number | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateCash: (newCash: number) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth_date: string;
}