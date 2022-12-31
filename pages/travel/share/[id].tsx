import { useCallback, useState } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { FaUserPlus } from "react-icons/fa";

import { withSession } from "../../../src/lib/withSession";
import { NextPageWithLayout } from "../../_app";
import useTravels from "../../../src/hooks/useTravels";
import { getSelectedTravel, getTravelURL, isValidEmail } from "../../../src/util";
import { common, share } from "../../../src/constants/locales";
import { getErrorTranslateKey } from "../../../src/util/apiLocaleUtil";
import { removeSharedFriend, shareTravel } from "../../../src/service/shareTravel";
import { getToken } from "../../../src/service/token";
import useSharedTravelUsers from "../../../src/hooks/useSharedTravelUsers";

import { notification } from "../../../src/components/atoms/Notification/Notification";
import { Text, H4 } from "../../../src/components/atoms/Typography/Typography"
import { Input } from "../../../src/components/atoms/Input/Input";
import { PopConfirm } from "../../../src/components/atoms/PopConfirm/PopConfirm";
import { PageLoader } from "../../../src/components/molecules/PageLoader/PageLoader";
import { PageTitle } from "../../../src/components/molecules/PageTitle/PageTitle";
import { TravelFriendList } from "../../../src/components/molecules/TravelFriendList/TravelFriendList";
import { NotFoundTemplate } from "../../../src/components/templates/NotFoundTemplate/NotFoundTemplate";
import { AccessDeniedTemplate } from "../../../src/components/templates/AccessDeniedTemplate/AccessDeniedTemplate";
import { CommonPageTemplate } from "../../../src/components/templates/CommonPageTemplate/CommonPageTemplate";

import styles from "./style.module.css"

const ShareTravelPage: NextPageWithLayout = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const token = getToken()

    const { data: travels, isLoading: travelLoading } = useTravels()

    const travelId = router.query.id;

    const { travel: data, hasTravel } = getSelectedTravel(travels, Number(travelId))

    const { data: friends, isLoading: friendsLoading, mutate } = useSharedTravelUsers(Number(travelId))

    const handleAdd = useCallback(() => {
        if (!isValidEmail(email)) {
            setError(t(common.invalid_email))
        } else {
            shareTravel(token, { invitedUserEmail: email, travelId: Number(travelId) }).then(() => {
                mutate();
                notification(t(share.travel_shared_success), "success")
                setEmail("")
            }).catch((err) => {
                notification(t(getErrorTranslateKey(err)), "error")
            })
        }
    }, [email, mutate, t, token, travelId])

    const handleRemove = useCallback((sharedId: number) => {
        removeSharedFriend(token, sharedId).then(() => {
            mutate();
            notification(t(share.remove_friend_success), "success")
        }).catch((err) => {
            notification(t(getErrorTranslateKey(err)), "error")
        })
    }, [mutate, t, token])

    if (travelLoading || friendsLoading) {
        return <PageLoader isLoading={true} />
    }

    if (!hasTravel) {
        return <NotFoundTemplate />
    }

    if (data.shared) {
        return <AccessDeniedTemplate />
    }

    return (
        <CommonPageTemplate link={getTravelURL(travelId as string)}>
            <div>
                <PageTitle title={t(share.share_travel)} />
                <div className={styles.center}>
                    <Text type="secondary">{t(share.share_travel_description)}</Text>
                </div>
                <div className={styles.input}>
                    <div className={styles.inputContainer}>
                        <Input
                            value={email}
                            error={error.length > 0}
                            placeholder={t(share.input_email_placeholder)}
                            onChange={(event) => {
                                setError("")
                                setEmail(event.target.value)
                            }}
                        />
                        {error.length ? <Text type="danger">{t(error)}</Text> : null}
                    </div>
                    <PopConfirm text={t(share.add_friend_confirmation_message, { email })} onConfirm={handleAdd}>
                        <FaUserPlus className={styles.icon} />
                    </PopConfirm>
                </div>
                <div className={styles.center}>
                    <H4>{t(share.friends)}</H4>
                </div>
                <TravelFriendList friends={friends.length ? friends : []} onRemove={handleRemove} />
            </div>
        </CommonPageTemplate>
    )
}

export const getServerSideProps = (withSession(async function ({
    req,
}) {

    return {
        props: {
            session: req.session,
        },
    }
}))

export default ShareTravelPage;