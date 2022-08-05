import { FaRocket, FaChartPie, FaMoneyBillAlt, } from "react-icons/fa"

import styles from "./style.module.css"

export const FeatureIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case "rocket_launch":
            return <div className={styles.icon}><FaRocket style={{ color: "#5377F0", fontSize: '32px' }} /></div>
        case "pie_chart":
            return <div className={styles.icon}><FaChartPie style={{ color: "#5377F0", fontSize: '32px' }} /></div>
        case "attach_money":
            return <div className={styles.icon}><FaMoneyBillAlt style={{ color: "#5377F0", fontSize: '32px' }} /></div>
        default:
            return null
    }
}