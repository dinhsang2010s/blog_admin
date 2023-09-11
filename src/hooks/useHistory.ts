interface IOptions {
  replace?: boolean;
}
export const useHistory = (url: string, options?: IOptions): void => {
  if (!options?.replace) window.history.pushState(null, "", url);
  else window.location.replace(url);
};
