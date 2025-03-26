// src/api/admin/dtos/tutorSessionDtos.ts
import { UserResponseDTO, UserRole } from './userDtos';

// Enum for SessionType matching backend
export enum SessionType {
  CHAMADA_DE_VIDEO = "CHAMADA_DE_VIDEO",
  CHAT = "CHAT"
}

export interface TutorSessionCreateDTO {
  mentorId: string;
  title: string;
  date: string; // ISO date string (e.g., "2025-03-25")
  dateHour: string; // ISO datetime string (e.g., "2025-03-25T14:30:00")
  type: SessionType;
  link: string;
  studentId: string;
}

export interface TutorSessionResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  mentor: UserResponseDTO;
  title: string;
  date: string; // ISO date string
  dateHour: string; // ISO datetime string
  type: SessionType;
  link: string;
  student: UserResponseDTO;
}