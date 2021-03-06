import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext();

export function useAuth() {
    const value = useContext(AuthContext)
    return value;
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout () {
       return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }
    //so executa quando motamos nosso componet
    useEffect(() => {
        //notifica sempre que um user for definido
        const unsubscriber =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscriber;

    }, [])

    //estado do user
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {/*Se nao estiver carregando, entao redenriza o children*/}
            {!loading && children}
        </AuthContext.Provider>

    )
}
