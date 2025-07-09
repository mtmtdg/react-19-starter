import { httpClient } from './http-client';

interface HelloResponse {
  message: string;
}

async function sayHello(): Promise<HelloResponse> {
  return httpClient.get('api/hello').json<HelloResponse>();
}

export const UserApi = {
  sayHello,
};
