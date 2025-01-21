import axios, { AxiosInstance, AxiosError } from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIIntanceProps = AxiosInstance & {
  registerInterceptTokenManager: (SignOut: SignOut) => () => void;
};

const api = axios.create({
  
  baseURL: "http://192.168.0.13:3333"
}) as APIIntanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;


const debugStorageAuthToken = async () => {
  const tokens = await storageAuthTokenGet();
  console.log('Tokens atualmente armazenados:', tokens);
  return tokens;
};

api.registerInterceptTokenManager = (SignOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response, 
    async (requestError) => {
      console.log('Erro na requisição:', requestError); 

      if (requestError?.response?.status === 401) { 
        console.log('Erro 401 detectado. Tentando renovar o token...');

       
        if (requestError.response.data.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
          const tokens = await debugStorageAuthToken(); 
          const refresh_token = tokens?.refresh_token;
          console.log('Refresh token obtido:', refresh_token);

          if (!refresh_token) {
            console.log('Nenhum refresh token encontrado. Fazendo SignOut.');
            SignOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;
          console.log('Configuração da requisição original:', originalRequestConfig);

         
          if (isRefreshing) {
            return new Promise((resolver, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                  console.log('Tentando refazer a requisição original com novo token:', token);
                  resolver(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  console.log('Erro ao refazer a requisição:', error);
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              console.log('Fazendo requisição para renovar o token...');
              const { data } = await api.post('/sessions/refresh-token', { refresh_token });
              console.log('Token atualizado com sucesso:', data.token);

              
              console.log('Salvando token e refresh_token:', { token: data.token, refresh_token: data.refresh_token });
              await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });
              console.log('Novo token e refresh token salvos com sucesso.');

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }

              originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
              console.log('Cabeçalhos atualizados com o novo token.');

              failedQueue.forEach(request => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig)); 
            } catch (error: any) {
              console.log('Erro ao atualizar o token:', error);
              failedQueue.forEach(request => {
                request.onFailure(error);
              });

              SignOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        SignOut(); 
      }

      if (requestError.response && requestError.response.data) {
        console.log('Erro recebido da API:', requestError.response.data.message);
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        console.log('Erro genérico:', requestError.message);
        return Promise.reject(new AppError(requestError.message));
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager); 
  };
};

export { api };
