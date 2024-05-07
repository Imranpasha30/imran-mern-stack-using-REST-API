import { createContext, useContext } from "react";


export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const  Authprovider = ({children}) =>{

    const storeTokenInLS = (serverToken) =>{
        return localStorage.setItem('token', serverToken);

    };

return( 
<AuthContext.Provider value={{storeTokenInLS}}>
{children}

</AuthContext.Provider>
);
};

export const useAuth =() =>{
    const authContextValue = useContext(AuthContext);
     if(!authContextValue){
        throw new Error('useAuth must be used within the AuthProvider');
     }
    return authContextValue;
};