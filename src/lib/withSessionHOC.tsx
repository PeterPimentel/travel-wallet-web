import { useRouter } from "next/router";

import useSession from "../hooks/useSession";
import { User } from "../types/CommonType";
import { getSignInURL } from "../util";

export type SessionProps = {
    data: User
}

export function withSessionHOC(Component) {
    return function Wrapper(props) {
        const router = useRouter();
        const { data, error, isLoading } = useSession()

        if (!isLoading && error) {
            router.push(getSignInURL())
        }

        const modifiedProps = {
            ...props,
            data
        }

        return <Component {...modifiedProps} />
    }
}