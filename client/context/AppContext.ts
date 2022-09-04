import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

const AppContext = createContext<{
    user?: User
    setUser?: Dispatch<SetStateAction<User|undefined>>
}>({})

export default AppContext