import { PUBLIC_GA_ID } from '$env/static/public';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090'
export const GA_ID = PUBLIC_GA_ID || ''