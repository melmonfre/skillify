// src/api/admin/controllers/AuthenticationAPI.ts
import api from '../../api';
import { RegisterRequest, AuthenticationRequest, AuthenticationResponse } from '../../dtos/authDtos';

export class AuthenticationAPI {
  static async register(request: RegisterRequest): Promise<AuthenticationResponse> {
    try {
      const response = await api.post<AuthenticationResponse>('/register', request);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    try {
      const response = await api.post<AuthenticationResponse>('/api/auth/authenticate', request);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}