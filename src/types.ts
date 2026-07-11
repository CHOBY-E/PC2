export interface User {
    email: string;
    username?: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  fullname: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Auth {
  token: string;
}

export type AvailabilityStatus = "DISPONIBLE" | "AGOTADO" | "PROXIMAMENTE";

export interface Products {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  availability: AvailabilityStatus;
}


export interface ProductInput {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}


export interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, fullname: string) => Promise<void>;
    logout: () => void;
}