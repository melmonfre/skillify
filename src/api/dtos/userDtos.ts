// src/api/admin/dtos/userDtos.ts
export enum UserRole {
    ADMIN = "ADMIN",
    ESTUDANTE = "ESTUDANTE",
    MENTOR = "MENTOR"
  }
  
  export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    tel: string;
    biography: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReport: boolean;
    studyReminder: boolean;
    role: UserRole;
  }
  
  export interface UserUpdateRequest {
    name: string;
    email: string;
    tel: string;
    biography: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReport: boolean;
    studyReminder: boolean;
    role: string;
  }