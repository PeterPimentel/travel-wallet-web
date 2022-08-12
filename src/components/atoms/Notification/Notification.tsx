import { message } from 'antd';
import Router from 'next/router';
import { Button } from '../Button/Button';

export const notification = (text: string, type: "success" | "error" | "warning") => {
    message[type](text);
};


// const notification = (text: string, type: "success" | "error" | "warning") => {
//     const key = `open${Date.now()}`;
//     const btn = (
//         <Button size="small" onClick={() => {
//             baseNotification.close(key)
//             Router.push("signin")
//         }}>
//             Signin
//         </Button>
//     );
//     baseNotification.open({
//         message: 'Notification Title',
//         description:
//             'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
//         btn,
//         key,
//     });
// };