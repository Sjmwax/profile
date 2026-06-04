import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const portfolioAPI = {
  // Portfolio
  getPortfolio: () => apiClient.get('/portfolio/'),
  
  // Skills
  getSkills: (category = null) => {
    const params = category ? { category } : {};
    return apiClient.get('/skills/', { params });
  },
  
  // Projects
  getProjects: () => apiClient.get('/projects/'),
  getFeaturedProjects: () => apiClient.get('/projects/featured/'),
  getProjectBySlug: (slug) => apiClient.get(`/projects/${slug}/`),
  
  // Experience
  getExperience: () => apiClient.get('/experience/'),
  
  // Education
  getEducation: () => apiClient.get('/education/'),
  
  // Messages
  sendMessage: (data) => apiClient.post('/messages/', data),
};

export default apiClient;
