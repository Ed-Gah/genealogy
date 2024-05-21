import {LocalStorage} from './storage';

export const getToken = () => {
    const response = LocalStorage.get('@authToken');
    return response;
}

export const getUserEmail = () => {
    return LocalStorage.get('@userEmail');
}

export const getUserId = () => LocalStorage.get('@userId');