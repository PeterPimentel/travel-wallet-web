import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

import { request } from "../../src/constants/locales";

import { Steps } from "../../src/components/atoms/Steps/Steps";
import { LogoWithName } from "../../src/components/molecules/LogoWithName/LogoWithName";
import { EmailRequest } from "../../src/components/organism/EmailRequest/EmailRequest";
import { SecurityValidation } from "../../src/components/organism/SecurityValidation/SecurityValidation";

import styles from "./style.module.css"
import { RequestFinished } from "../../src/components/organism/RequestFinished/RequestFinished";

const RequestPage = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [email, setEmail] = useState("")

    const { t } = useTranslation();

    const steps = [
        {
            title: t(request.password_reset),
            key: request.password_reset,
        },
        {
            title: t(request.security_verification),
            key: request.security_verification,
        },
        {
            title: t(request.reset_password_finished),
            key: request.reset_password_finished,
        },
    ];

    return <div className={styles.page}>
        <LogoWithName size="extraLarge" layout="vertical" />
        <div className={styles.content}>
            <Steps current={currentStep} items={steps} />
            <div className={styles.steps}>
                {currentStep === 0 ? <EmailRequest email={email} onChangeEmail={setEmail} onNextStep={() => setCurrentStep(1)} /> : null}
                {currentStep === 1 ? <SecurityValidation email={email} onNextStep={() => setCurrentStep(3)} /> : null}
                {currentStep >= 2 ? <RequestFinished /> : null}
            </div>
        </div>

    </div>
}

export default RequestPage;
