const devBaseURL = "http://127.0.0.1:3000";
const proBaseURL = "http://127.0.0.1:3000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
