import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 서버에서 미리 가져온 데이터를 브라우저가 받자마자 다시 요청하지 않게 한다.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * QueryClient를 돌려준다.
 * 서버에서는 요청끼리 데이터가 섞이지 않도록 매번 새로 만들고,
 * 브라우저에서는 하나를 만들어 계속 쓴다.
 */
export function getQueryClient() {
  if (isServer) return makeQueryClient();

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
