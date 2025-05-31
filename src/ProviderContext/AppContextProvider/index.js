// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AppContextProvider = createContext();
export const useContextProvider = () => useContext(AppContextProvider);

const AppContextAction = createContext();
export const useContextAction = () => useContext(AppContextAction);

const AppContext = ({ children }) => {
    const [targetBlog, setTargetBlog] = useState("");
    const [targetCourses, setTargetCourses] = useState("");
    const [devMode, setDevMode] = useState(false);
    const [dataCourse, setDataCourse] = useState(null)
    const [dataBlog, setDataBlog] = useState(null)
    const [showCatalog, setShowCatalog] = useState(() => {
        const saved = sessionStorage.getItem("showCatalog");
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [isModalEditUser, setIsModalEditUser] = useState(false)
    
    useEffect(() => {
        sessionStorage.setItem("showCatalog", JSON.stringify(showCatalog));
    }, [showCatalog]);
    
    return (
        <AppContextProvider.Provider value={{isModalEditUser, targetBlog, targetCourses, showCatalog, devMode , dataCourse, dataBlog }}>
            <AppContextAction.Provider value={{setIsModalEditUser, setDataBlog, setTargetBlog, setTargetCourses, setShowCatalog , setDevMode, setDataCourse}}>
                {children}
            </AppContextAction.Provider>
        </AppContextProvider.Provider>
    );
};

export default AppContext;
