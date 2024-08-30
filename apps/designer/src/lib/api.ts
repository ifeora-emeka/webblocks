import Cookie from 'js-cookie';
import { cookies } from 'next/headers';

export const fetchAPI = async (url: string, options: RequestInit) => {
    const token = cookies().get('token')?.value as string;
    
    return await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        }
    })
}