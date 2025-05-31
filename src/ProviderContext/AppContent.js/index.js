import MyRoute from "../../routes/index.js";
import AppAuthJWTContext from "../AppAuthJWTContext.js";
import AppContext from "../AppContextProvider/index.js";
import AppThemeContextProvider from "../AppThemeContext.js";
import AppThemeAntdProvider from "../AppThemeAntdProvider/index.js";



const AppContent = () => {
    return (
        <AppAuthJWTContext>
            <AppContext>
                    <AppThemeContextProvider>
                        <AppThemeAntdProvider>
                            <MyRoute />
                        </AppThemeAntdProvider>
                    </AppThemeContextProvider>
            </AppContext>
        </AppAuthJWTContext>
    );
};

export default AppContent;