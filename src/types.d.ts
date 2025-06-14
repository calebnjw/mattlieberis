declare module '*.svg' {
  const content: string;
  export default content;
}

declare module './reportWebVitals.js' {
  const reportWebVitals: (onPerfEntry?: (metric: any) => void) => void;
  export default reportWebVitals;
} 