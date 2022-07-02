import { useRouter } from "next/router";

import { ROUTES } from "../constants";
import useSession from "../hooks/useSession";

export function withSessionHOC(Component) {
    return function Wrapper(props) {
        const router = useRouter();
        const { session, error, loading } = useSession()

        if (!loading && error) {
            router.push(`/${ROUTES.signin}`)
        }

        const modifiedProps = {
            ...props,
            session
        }

        return <Component {...modifiedProps} />
    }
}