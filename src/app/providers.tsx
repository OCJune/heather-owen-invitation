"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/queryClient";

/** 앱 전체를 감싸는 전역 Provider 모음 */
export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
