export {};

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    trackFB?: (event: string, params?: Record<string, any>) => void;
  }
}
