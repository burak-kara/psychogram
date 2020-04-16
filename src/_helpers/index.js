import * as STORAGE_CONSTANTS from '../constants/storageConstants';

export const isAuthenticated = () => getActiveToken(true) != null;

export const getActiveToken = (checkExpire = false) => {
    const token = localStorage.getItem(STORAGE_CONSTANTS.ACCESS_TOKEN);

    if (checkExpire && token && isExpired(token)) return null;
    return token;
};

const isExpired = token => Date.now() >= token * 1000;
