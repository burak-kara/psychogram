import moment from 'moment';
import Star, { Rate } from '../assets/starLogo/star';

// Returns data keys from snapshot.val()
export const getKeys = data => Object.keys(data);

export const getValues = data => Object.values(data);

// Returns date as string
// e.g. Today, Yesterday
export const dateAsString = date => {
    // get from-now for this date
    const fromNow = moment(date).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment(date).calendar(null, {
        // when the date is closer, specify custom values
        lastWeek: '[Last] dddd',
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        // when the date is further away, use from-now functionality
        sameElse: () => {
            return '[' + fromNow + ']';
        },
    });
};

export const formatDateAsHours = date => moment(date).format('HH:mm');

export const snapshotToArray = snapshot => {
    let array = [];
    snapshot.forEach(child => {
        let item = child.val();
        item.key = child.key;
        array.push(item);
    });
    return array;
};

export const getStar = rating => {
    if (rating === Rate.FIVE) {
        return Star.five_star;
    } else if (rating === Rate.FOUR) {
        return Star.four_star;
    } else if (rating === Rate.THREE) {
        return Star.three_star;
    } else if (rating === Rate.TWO) {
        return Star.two_star;
    } else if (rating === Rate.ONE) {
        return Star.one_star;
    } else {
        return Star.zero_star;
    }
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const hasNumber = value => new RegExp(/[0-9]/).test(value);

const hasMixed = value =>
    new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);

const hasSpecial = value => new RegExp(/[!#@$%^&*)(+=._-]/).test(value);

export const passCheck = passObj => {
    const response = {
        err: false,
        mess: '',
    };

    let isMinLen = false;
    let isMaxLen = false;
    let isNumber = false;
    let isMixChar = false;
    let isSpecial = false;

    let password = passObj.passwd;

    if (Number(password.length) >= Number(passObj.policy.min)) isMinLen = true;
    if (Number(password.length) <= Number(passObj.policy.max)) isMaxLen = true;

    if (hasNumber(password)) isNumber = true;
    if (hasMixed(password)) isMixChar = true;
    if (hasSpecial(password)) isSpecial = true;

    const isLength = isMinLen && isMaxLen;
    const isStrength =
        passObj.policy.hasNumber &&
        passObj.policy.hasMixChar &&
        passObj.policy.hasSpecial;

    if (!isLength) {
        response.err = true;
        response.mess = `Password length must be between ${passObj.policy.min} and ${passObj.policy.max}`;
    } else if (!isStrength) {
        response.mess = 'Password is OK';
    } else if (passObj.policy.hasNumber && !isNumber) {
        response.err = true;
        response.mess = 'Password must contain at least one number';
    } else if (passObj.policy.hasMixChar && !isMixChar) {
        response.err = true;
        response.mess = 'Password must contain upper and lowercase characters';
    } else if (passObj.policy.hasSpecial && !isSpecial) {
        response.err = true;
        response.mess =
            'Password must contain at least one special characters like [!#@$%^&*)(+=._-]';
    } else {
        response.mess = 'Password is Strong';
    }
    return response;
};
