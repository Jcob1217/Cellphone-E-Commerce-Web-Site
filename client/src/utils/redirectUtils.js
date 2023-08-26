export const handleUnauthenticatedRedirect = (navigate, path) => {
  localStorage.setItem(
    "redirect",
    JSON.stringify("Please sign in to continue")
  );
  console.log(path);
  navigate(`/login?redirect=${path}`);
};
