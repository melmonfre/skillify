// src/api/admin/dtos/practiceDtos.ts
import { UserResponseDTO } from './userDtos';
import { ClassroomResponseDTO } from './classroomDtos';
import { QuestionResponseDTO } from './questionDtos';

export interface PracticeCreateDTO {
  mentorId: string;
  classroomId: string;
  title: string;
  numberOfQuestions: number;
  duracao: number;
  openingDate: string; // ISO datetime string (e.g., "2025-03-25T14:30:00")
  maximumDate: string; // ISO datetime string
  questionIds: Set<string>;
}

export interface PracticeResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  mentor: UserResponseDTO;
  classroom: ClassroomResponseDTO;
  title: string;
  numberOfQuestions: number;
  duracao: number;
  openingDate: string; // ISO datetime string
  maximumDate: string; // ISO datetime string
  questions: Set<QuestionResponseDTO>;
}