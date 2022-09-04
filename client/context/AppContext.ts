import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

const AppContext = createContext<{
    user: User|null
    setUser: Dispatch<SetStateAction<User|null>>|null
}>({
    user: null,
    setUser: null,
})

export default AppContext