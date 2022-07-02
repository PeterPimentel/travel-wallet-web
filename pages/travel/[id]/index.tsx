import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'

import { useTravel } from "../../../src/hooks/useTravel";
import { ROUTES } from '../../../src/constants';
import { sessionOptions } from "../../../src/lib/session"
import { withSession } from "../../../src/lib/withSession"

import { NextPageWithLayout } from '../../_app';
import { ExpenseList } from "../../../src/components/organism/ExpenseList/ExpenseList";
import TravelPageLayout from '../../../src/components/organism/TravelPageLayout/TravelPageLayout';

export const TravelPage: NextPageWithLayout = ({ auth }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const route = useRouter();

    // @ts-ignore
    const { data } = useTravel(Number(route.query.id), auth.token);

    const expenses = data ? data.expenses : []

    return <ExpenseList expenses={expenses} />
}

TravelPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

// export async function getServerSideProps(context) {
//     return {
//         props: {
//             ...(await serverSideTranslations(context.locale, ['common'])),
//         },
//     };
// }

// export const getServerSideProps = withIronSessionSsr(async function ({
//     locale,
//     req,
//     res,
// }) {
//     const auth = req.session.auth

//     if (!auth?.token) {
//         res.setHeader('location', `/${ROUTES.signin}`)
//         res.statusCode = 302
//         res.end()
//         return {
//             props: {
//                 auth: {
//                     user: {},
//                     token: '',
//                 },
//                 ...(await serverSideTranslations(locale, ['common'])),
//             },
//         }
//     }

//     return {
//         props: { auth: req.session.auth, ...(await serverSideTranslations(locale, ['common'])), },
//     }
// }, sessionOptions)

export const getServerSideProps = withIronSessionSsr(withSession(async function ({
    locale,
    req,
    res,
}) {
    console.log("TESTE", req.mySession)
    const auth = req.session.auth

    if (!auth?.token) {
        res.setHeader('location', `/${ROUTES.signin}`)
        res.statusCode = 302
        res.end()
        return {
            props: {
                auth: {
                    user: {},
                    token: '',
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
        }
    }

    return {
        props: { auth: req.session.auth, ...(await serverSideTranslations(locale, ['common'])), },
    }
}), sessionOptions)

export default TravelPage;

