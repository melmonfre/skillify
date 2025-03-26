// src/api/admin/dtos/courseCategoryDtos.ts
export interface CourseCategoryCreateDTO {
    categoryName: string;
  }
  
  export interface CourseCategoryResponseDTO {
    id: string; // Assuming BaseResponseDTO provides this
    categoryName: string;
  }