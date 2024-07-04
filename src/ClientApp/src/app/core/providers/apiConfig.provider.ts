import {environment} from "../../../environments/environment";
import {Provider} from "@angular/core";

export interface ApiConfig {
  apiUrl: string;
}

export const getApiConfig = () => {
  return environment.apiConfig
}

export const apiConfigProvider: Provider = {
  provide: 'API_CONFIG',
  useFactory: getApiConfig
}
