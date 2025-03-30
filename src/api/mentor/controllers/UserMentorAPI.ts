// src/api/mentor/controllers/UserMentorAPI.ts
import api from '../../api';
import { UserResponseDTO } from '../../dtos/userDtos';

export class UserMentorAPI {
  static async getAllStudents(): Promise<UserResponseDTO[]> {
    try {
      const response = await api.get<UserResponseDTO[]>('/api/mentor/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching mentor\'s students:', error);
      throw error;
    }
  }
}