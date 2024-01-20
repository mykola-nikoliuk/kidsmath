import axios, { Axios } from 'axios';

interface DashboardWithAnswers {
  dashboard: string;
  answers: string[] | number[];
}

export class KidsMathService {

  // todo create requests order
  private axiosInstance: Axios;

  constructor(baseURL: string, token: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }

  async getDashboard(userId: number) {
    const { data } = await this.axiosInstance.get<DashboardWithAnswers>(`${this.getUserPath(userId)}/dashboard`);
    return data;
  }

  async tryAnswer(userId: number, answer: string) {
    const { data } = await this.axiosInstance.post<DashboardWithAnswers>(`${this.getUserPath(userId)}/tryAnswer`, { answer });
    return data;
  }

  private getUserPath(userId: number) {
    return `users/${userId}`;
  }
}
