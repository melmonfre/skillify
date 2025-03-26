// src/api/admin/dtos/salesPlanDtos.ts

export enum PlanType {
    BASIC = "BASIC",
    PREMIUM = "PREMIUM",
    // Add other plan types as defined in your backend enum
  }
  
  export interface SalesPlanCreateDTO {
    name: string;
    description: string;
    price: string; // Using string to represent BigDecimal
    type: PlanType;
    resources: string[];
  }
  
  export interface SalesPlanResponseDTO {
    id: string; // Assuming BaseResponseDTO provides this
    name: string;
    description: string;
    price: string; // Using string to represent BigDecimal
    type: PlanType;
    resources: string[];
  }