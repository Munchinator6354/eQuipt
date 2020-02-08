import React, {useState, createContext} from 'react';

export const LoggedInContext = createContext();

export const LoggedInProvider = (props) => {
   const state = {
       loggedIn: true,
   }
    return (
        <LoggedInContext.Provider value={state.loggedIn}>
            {props.children}
        </LoggedInContext.Provider>
    );

}