import { PUBLIC_GA_ID } from '$env/static/public';
import { VITE_API_BASE_URL } from '$env/static/private';

export const API_BASE_URL = VITE_API_BASE_URL
export const GA_ID = PUBLIC_GA_ID || ''