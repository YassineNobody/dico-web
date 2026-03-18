import axios, { type AxiosInstance } from "axios";
import type {
  Authenticate,
  UserCredential,
  UserRegisterForm,
} from "../interfaces/user/user";
import constants from "../constants/constants";

export const ContentType = {
  WORDS: "words",
  LEARN_CATEGORIES: "learn-categories",
  LEARN: "learns",
  SETTINGS_USER: "settings",
  FOLDERS: "folders",
  TEXT_FOLDERS: "text-folder",
  FLASHCARD: "flashcard",
  QUIZ: "quiz",
};
export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export type QueryParams = {
  sourceLanguage: "AR" | "FR";
  targetLanguage: "AR" | "FR";
};

class Api {
  private token?: string;
  private request: AxiosInstance;

  constructor(baseURL: string) {
    this.request = axios.create({ baseURL });
    this.token = undefined;
    // Request Interceptor
    this.request.interceptors.request.use(
      (config) => {
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor
    this.request.interceptors.response.use(
      (resp) => resp.data,
      (error) => {
        console.log(error);
        return Promise.reject(error.response.data);
      },
    );
  }

  async currentUser(token: string) {
    this.token = token;
    return this.request
      .get<void, Authenticate>("/api/auth/me")
      .catch((error) => {
        throw error;
      });
  }
  async logout() {
    this.token = undefined;
  }

  async login(credential: UserCredential) {
    return this.request
      .post<UserCredential, Authenticate>("/api/auth/login", credential)
      .catch((error) => {
        throw error;
      });
  }

  async register(newUser: UserRegisterForm) {
    return this.request
      .post<UserRegisterForm, Authenticate>("/api/auth/register", newUser)
      .catch((error) => {
        throw error;
      });
  }

  async create<T, R>(contentType: ContentType, data: T, endPoint?: string) {
    return this.request
      .post<T, R>(`/api/${contentType}${endPoint ? endPoint : ""}`, data)
      .catch((error) => {
        throw error;
      });
  }

  async get<R>(
    contentType: ContentType,
    endPoint?: string,
    params?: QueryParams,
  ) {
    return this.request
      .get<void, R>(`/api/${contentType}${endPoint ? endPoint : ""}`, {
        params,
      })
      .catch((error) => {
        throw error;
      });
  }

  async patch<R>(contentType: ContentType, endPoint?: string) {
    return this.request
      .patch<void, R>(`/api/${contentType}${endPoint ? endPoint : ""}`)
      .catch((error) => {
        throw error;
      });
  }

  async update<T, R>(
    contentType: ContentType,
    data: T,
    endPoint?: string,
    params?: QueryParams,
  ) {
    return this.request
      .put<void, R>(`/api/${contentType}${endPoint ? endPoint : ""}`, data, {
        params,
      })
      .catch((error) => {
        throw error;
      });
  }

  async delete<T>(
    contentType: ContentType,
    endPoint?: string,
    params?: QueryParams,
  ) {
    return this.request
      .delete<void, T>(`/api/${contentType}${endPoint ? endPoint : ""}`, {
        params,
      })
      .catch((error) => {
        throw error;
      });
  }
}

export const api = new Api(constants.URL_API);
