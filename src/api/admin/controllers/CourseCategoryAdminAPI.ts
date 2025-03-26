// src/api/admin/controllers/CourseCategoryAdminAPI.ts
import api from '../../api';
import { CourseCategoryCreateDTO, CourseCategoryResponseDTO } from '../../dtos/courseCategoryDtos';

export class CourseCategoryAdminAPI {
  /**
   * Gets all course categories (admin only)
   * @returns Promise containing array of course category DTOs
   */
  static async getAllCategories(): Promise<CourseCategoryResponseDTO[]> {
    try {
      const response = await api.get<CourseCategoryResponseDTO[]>('/api/admin/course-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching all course categories:', error);
      throw error;
    }
  }

  /**
   * Gets a course category by ID (admin only)
   * @param id Category ID
   * @returns Promise containing course category DTO
   */
  static async getCategoryById(id: string): Promise<CourseCategoryResponseDTO> {
    try {
      const response = await api.get<CourseCategoryResponseDTO>(`/api/admin/course-categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course category by ID:', error);
      throw error;
    }
  }

  /**
   * Creates a new course category (admin only)
   * @param category Category creation data
   * @returns Promise containing created course category DTO
   */
  static async createCategory(category: CourseCategoryCreateDTO): Promise<CourseCategoryResponseDTO> {
    try {
      const response = await api.post<CourseCategoryResponseDTO>('/api/admin/course-categories', category);
      return response.data;
    } catch (error) {
      console.error('Error creating course category:', error);
      throw error;
    }
  }

  /**
   * Updates an existing course category (admin only)
   * @param id Category ID
   * @param category Category update data
   * @returns Promise containing updated course category DTO
   */
  static async updateCategory(id: string, category: CourseCategoryCreateDTO): Promise<CourseCategoryResponseDTO> {
    try {
      const response = await api.put<CourseCategoryResponseDTO>(`/api/admin/course-categories/${id}`, category);
      return response.data;
    } catch (error) {
      console.error('Error updating course category:', error);
      throw error;
    }
  }

  /**
   * Deletes a course category (admin only)
   * @param id Category ID
   * @returns Promise containing void
   */
  static async deleteCategory(id: string): Promise<void> {
    try {
      await api.delete(`/api/admin/course-categories/${id}`);
    } catch (error) {
      console.error('Error deleting course category:', error);
      throw error;
    }
  }
}

// Usage example:
/*
async function handleCourseCategoryAdminOperations() {
  try {
    // Get all categories
    const allCategories = await CourseCategoryAdminAPI.getAllCategories();
    console.log('All categories:', allCategories);

    // Create new category
    const newCategory: CourseCategoryCreateDTO = {
      categoryName: "Mathematics"
    };
    const createdCategory = await CourseCategoryAdminAPI.createCategory(newCategory);
    console.log('Created category:', createdCategory);

    // Get specific category
    const category = await CourseCategoryAdminAPI.getCategoryById(createdCategory.id);
    console.log('Category:', category);

    // Update category
    const updatedCategory = await CourseCategoryAdminAPI.updateCategory(createdCategory.id, {
      categoryName: "Advanced Mathematics"
    });
    console.log('Updated category:', updatedCategory);

    // Delete category
    await CourseCategoryAdminAPI.deleteCategory(createdCategory.id);
    console.log('Category deleted successfully');
  } catch (error) {
    console.error('Course category admin operation failed:', error);
  }
}
*/