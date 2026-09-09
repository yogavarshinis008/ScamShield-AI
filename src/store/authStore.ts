import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
  loginAsDemo: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email: string, password: string) => {
    // Demo authentication
    if (email && password) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=6b84ff&color=fff`,
      };
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  
  register: (email: string, username: string, password: string) => {
    if (email && username && password) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=6b84ff&color=fff`,
      };
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },
  
  loginAsDemo: () => {
    const demoUser: User = {
      id: 'demo-user',
      email: 'demo@scamshield.ai',
      username: 'DemoUser',
      avatar: 'https://ui-avatars.com/api/?name=DemoUser&background=6b84ff&color=fff',
    };
    set({ user: demoUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(demoUser));
  },
}));
