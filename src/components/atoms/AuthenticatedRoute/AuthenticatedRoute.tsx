import { useContext } from "react";

import { AuthContext } from "../../../hooks/useAuthContext";

interface AuthenticatedRouteProps {
    page: JSX.Element;
}

export const AuthenticatedRoute = ({ page }: AuthenticatedRouteProps) => {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticated()) {
        return <div>Need Auth</div>;
    }

    return page;
}