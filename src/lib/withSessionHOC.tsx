import { useRouter } from "next/router";

import { ROUTES } from "../constants";
import useSession from "../hooks/useSession";

export function withSessionHOC(Component) {
    return function Wrapper(props) {
        const router = useRouter();
        const { data, error, isLoading } = useSession()

        if (!isLoading && error) {
            router.push(`/${ROUTES.signin}`)
        }

        const modifiedProps = {
            ...props,
            data
        }

        return <Component {...modifiedProps} />
    }
}