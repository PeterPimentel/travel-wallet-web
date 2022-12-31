import { APP_NAME } from "../../../constants";
import { getTravelsURL } from '../../../util';

import { AccessDenied } from '../../molecules/AccessDenied/AccessDenied';
import { CommonPageTemplate } from '../CommonPageTemplate/CommonPageTemplate';

type AccessDeniedTemplate = {
}

export const AccessDeniedTemplate = ({ }: AccessDeniedTemplate) => {
    return (
        <CommonPageTemplate title={`403 - ${APP_NAME}`} link={getTravelsURL()}>
            <AccessDenied />
        </CommonPageTemplate>
    )
}