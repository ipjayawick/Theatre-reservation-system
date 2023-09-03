import { useCallback, useEffect, useState } from "react";

let logoutTimer;
const sessionTimeOutIn = 1000 * 60 * 60;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  const login = useCallback((loggedInUser, token, isAdmin, expirationDate) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setUser(loggedInUser);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + sessionTimeOutIn);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "user",
      JSON.stringify({
        user: loggedInUser,
        isAdmin: isAdmin,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.user,
        storedData.token,
        storedData.isAdmin,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, user, isAdmin };
};
