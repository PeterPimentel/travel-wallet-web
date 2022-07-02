import { message } from 'antd';

export const notification = (text: string, type: "success" | "error" | "warning") => {
    message[type](text);
};
