import { FaRocket, FaChartPie, FaMoneyBillAlt, } from "react-icons/fa"
import { MdFileDownloadOff } from "react-icons/md"
import { BASE_COLORS } from "../../../constants"

import styles from "./style.module.css"

export const FeatureIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case "rocket_launch":
            return <div className={styles.icon}><FaRocket style={{ color: BASE_COLORS.primary, fontSize: '32px' }} /></div>
        case "pie_chart":
            return <div className={styles.icon}><FaChartPie style={{ color: BASE_COLORS.primary, fontSize: '32px' }} /></div>
        case "attach_money":
            return <div className={styles.icon}><FaMoneyBillAlt style={{ color: BASE_COLORS.primary, fontSize: '32px' }} /></div>
        case "file_download_off":
            return <div className={styles.icon}><MdFileDownloadOff style={{ color: BASE_COLORS.primary, fontSize: '32px' }} /></div>
        default:
            return null
    }
}