// src/api/admin/dtos/questionDtos.ts
import { UserResponseDTO } from './userDtos';

export interface OptionResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  title: string;
  correct: boolean;
}

export interface QuestionCreateDTO {
  title: string;
  mentorId: string;
}

export interface QuestionResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  title: string;
  options: Set<OptionResponseDTO>;
  mentor: UserResponseDTO;
}