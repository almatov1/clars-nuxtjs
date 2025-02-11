import { API, type HttpMethod } from "~/src/core/config/shared"
import { push } from 'notivue';
import { LogoutService } from "~/src/module/user/service/LogoutService";

interface ApiParams {
  method: HttpMethod
  path: string
  useToken?: boolean
  body?: any
  url?: string
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
    if (error?.response?._data?.message === 'UNAUTHORIZED') await LogoutService({});
    push.error(error?.response?._data?.message);
  }
}
