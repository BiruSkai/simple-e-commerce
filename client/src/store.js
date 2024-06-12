import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import { 
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER 
} from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//         key:"root",
//         storage
// };

console.log("test: ", userReducer)

export default configureStore({
        reducer: {
                users: userReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
        })
});