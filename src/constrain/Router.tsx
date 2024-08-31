export const Router = ({ url }: { url: string }) => {
  if (typeof window && window !== undefined) {
    window.location.href = url;
  }
};
