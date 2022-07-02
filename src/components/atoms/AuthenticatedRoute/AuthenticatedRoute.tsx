import { useRouter } from "next/router";
import { useContext } from "react";

import { ROUTES } from "../../../constants";
import { AuthContext } from "../../../hooks/useAuthContext";

interface AuthenticatedRouteProps {
    page: JSX.Element;
}

export const AuthenticatedRoute = ({ page }: AuthenticatedRouteProps) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticated()) {
        router.push(`/${ROUTES.signin}`);
    }

    return page;
}