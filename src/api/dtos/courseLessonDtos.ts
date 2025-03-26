// src/api/admin/dtos/courseLessonDtos.ts
import { CourseResponseDTO } from './courseDtos';
import { CourseLessonCategoryResponseDTO } from './courseLessonCategoryDtos';

// Assuming a basic structure for ClassroomResponseDTO
export interface ClassroomResponseDTO {
  id: string;
  // Add other fields as needed when the actual DTO is available
}

export interface CourseLessonCreateDTO {
  courseId: string;
  courseLessonCategoryId: string;
  classroomId: string;
  files: string[];
  name: string;
  duration: number;
}

export interface CourseLessonResponseDTO {
  id: string; // Assuming BaseResponseDTO provides this
  course: CourseResponseDTO;
  courseLessonCategory: CourseLessonCategoryResponseDTO;
  classroom: ClassroomResponseDTO;
  files: string[];
  name: string;
  duration: number;
}