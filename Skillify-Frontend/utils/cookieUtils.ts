// utils/cookieUtils.ts

export const getCookie = (name: string) => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    // If the cookie exists
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
  }
  return null;
};
