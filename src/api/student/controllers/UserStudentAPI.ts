import { UserResponseDTO } from '@/api/dtos/userDtos';
import api from '../../api';
import { MessageCreateDTO, MessageResponseDTO } from '../../dtos/messageDtos';


export class UserStudentAPI{
        /**
   * Finds all available mentors
   * @returns Promise containing set of mentor DTOs
   */
        static async findAvailableMentors(): Promise<UserResponseDTO[]> {
            try {
              const response = await api.get<UserResponseDTO[]>('/api/student/users/mentors');
              return response.data;
            } catch (error) {
              console.error('Error fetching available mentors:', error);
              throw error;
            }
          }
}