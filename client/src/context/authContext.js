import { createContext } from "react";

function noop() {}

const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop
});

export default AuthContext;
