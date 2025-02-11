import { API, type HttpMethod } from "~/src/core/config/shared"
import { push } from 'notivue';

interface ApiParams {
  method: HttpMethod
  path: string
  useToken?: boolean
  url?: string
  body?: any
  init?: boolean
}

export const useApi = async (params: ApiParams) => {
  let headers = new Headers();
  if (params.useToken) {
    const accessToken = useCookie('accessToken').value;
    if (accessToken) headers.append('Authorization', `Bearer ${accessToken}`)
  }

  try {
    return await $fetch(params.url ?? API + params.path, {
      method: params.method,
      headers: headers,
      body: params.body,
    });
  } catch (error: any) {
    if (!params.init && error?.response?._data?.message === 'UNAUTHORIZED') await LogoutService({});

    push.error(error?.response?._data?.message);
  }
}