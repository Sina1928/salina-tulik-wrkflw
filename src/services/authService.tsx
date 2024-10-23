import axios from "axios";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class Auth {
  private static instance: Auth;
  private refreshPromise: Promise<AuthTokens> | null = null;

  private constructor() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.retry) {
          originalRequest._retry = true;

          try {
            const tokens = await this.refreshAccessToken();
            if (tokens) {
              this.setTokens(tokens);
              originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  async signup(signupData: {
    email: string;
    password: string;
    companyName: string;
    industry_id: number;
  }): Promise<void> {
    const response = await axios.post(
      "http://localhost:8080/auth/signup",
      signupData
    );
    this.setTokens(response.data);
  }

  async login(email: string, password: string): Promise<void> {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    this.setTokens(response.data);
  }

  async refreshAccessToken(): Promise<AuthTokens | null> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.doRefreshToken();
    }

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async doRefreshToken(): Promise<AuthTokens> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await axios.post("http://localhost:8080/auth/refresh", {
      refreshToken,
    });
    return response.data;
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }

  getAccessToken(): boolean {
    return !!this.getAccessToken();
  }
  logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default Auth.getInstance();
