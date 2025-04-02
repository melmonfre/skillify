// src/api/admin/dtos/questionDtos.ts
import { UserResponseDTO } from './userDtos';

// Enum to match QuestionSuperAdminType from Java
export enum QuestionSuperAdminType {
  MATEMATICA = 'MATEMATICA',
  FISICA = 'FISICA',
  GEOGRAFIA = 'GEOGRAFIA',
  BIOLOGIA = 'BIOLOGIA',
  ENEM = 'ENEM',
  FUVEST = 'FUVEST',
}

export interface OptionResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  title: string;
  correct: boolean;
}

export interface QuestionCreateDTO {
  title: string;
  mentorId: string;
  superAdminTypes?: QuestionSuperAdminType[]; // Optional field
}

export interface QuestionResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  title: string;
  options: Set<OptionResponseDTO>;
  mentor: UserResponseDTO;
  superAdminTypes?: QuestionSuperAdminType[]; // Optional field
}