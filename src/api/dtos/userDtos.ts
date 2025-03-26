// src/api/admin/dtos/userDtos.ts
export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    ESTUDANTE = "ROLE_ESTUDANTE",
    MENTOR = "ROLE_MENTOR"
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