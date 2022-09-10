import { Navigate } from "react-router-dom";
import { useReducerContext } from "../Context/ReducerContext";

export function PrivateRoute({ children, path, ...state }) {
    const { userId } = useReducerContext();

    return !userId ? (
        <Navigate replace to="/login" state={{ previousPath: `${path}` }} />
        ) : (
        children
    );
}
