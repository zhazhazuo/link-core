const HTTP_METHOD_MAP = {
  GET: "GET",
  HEAD: "HEAD",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  CONNECT: "CONNECT",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  PATCH: "PATCH",
};

interface Config {
  /**
   * API 地址
   */
  url: string;
  /**
   * API 方法
   */
  method: keyof typeof HTTP_METHOD_MAP;
}

interface APIInstance<FetchAction extends (...arg: any) => Promise<unknown>>
  extends Config {
  params: Parameters<FetchAction>;
  result: Awaited<ReturnType<FetchAction>>;
}

/**
 * 生成 API 实例，作用：
 * - 减少魔术字符串
 * - 提升 API 可读性
 * - TS 类型推断
 * @generic FetchAction API 请求函数类型
 * @param config API-url、API-method
 * @returns API 实例。
 */
export const generateAPIInstance = <
  FetchAction extends (...arg: any[]) => Promise<unknown>
>(
  config: Config
): APIInstance<FetchAction> => ({
  ...config,
  params: {} as unknown as Parameters<FetchAction>,
  result: {} as unknown as Awaited<ReturnType<FetchAction>>,
});

/**
 * 生成 API 实例，作用：
 * - 减少魔术字符串
 * - 提升 API 可读性
 * - TS 类型推断
 * @generic FetchAction API 请求函数类型
 * @param config API-url、API-method
 * @returns API 实例。
 */
export const G = generateAPIInstance;
