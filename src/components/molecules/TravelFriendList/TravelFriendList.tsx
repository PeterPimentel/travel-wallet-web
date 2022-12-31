
import useTranslation from 'next-translate/useTranslation'
import { FaTrashAlt } from "react-icons/fa";

import { share } from "../../../constants/locales";
import { TravelFriend } from "../../../types/ShareType";

import { Text } from "../../atoms/Typography/Typography";
import { PopConfirm } from "../../atoms/PopConfirm/PopConfirm";

import styles from "./style.module.css"

interface TravelFriendListProps {
    friends: TravelFriend[];
    onRemove: (shareId: number) => void;
}

export const TravelFriendList = ({ friends, onRemove }: TravelFriendListProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            {
                friends.map(friend => (
                    <div key={friend.shareId} className={styles.item}>
                        <Text>{friend.email}</Text>
                        <PopConfirm text={t(share.remove_friend_confirmation_message, { email: friend.email })} onConfirm={() => onRemove(friend.shareId)}>
                            <FaTrashAlt className={styles.removeIcon} />
                        </PopConfirm>
                    </div>
                ))
            }
        </div>
    )
}