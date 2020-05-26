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

const hasNumber = value => {
    return new RegExp(/[0-9]/).test(value);
};

const hasMixed = value => {
    return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

const hasSpecial = value => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

export const passCheck = passObj => {
    var retObj = {
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

    let isLength = isMinLen && isMaxLen;
    let isStrength = false;

    if (
        passObj.policy.hasNumber === true &&
        passObj.policy.hasMixChar === true &&
        passObj.policy.hasSpecial === true
    ) {
        isStrength = isNumber && isMixChar && isSpecial;
    } else if (
        passObj.policy.hasNumber === true &&
        passObj.policy.hasMixChar === true &&
        passObj.policy.hasSpecial === false
    ) {
        isStrength = isNumber && isMixChar;
    } else if (
        passObj.policy.hasNumber === true &&
        passObj.policy.hasMixChar === false &&
        passObj.policy.hasSpecial === true
    ) {
        isStrength = isNumber && isSpecial;
    } else if (
        passObj.policy.hasNumber === true &&
        passObj.policy.hasMixChar === false &&
        passObj.policy.hasSpecial === false
    ) {
        isStrength = isNumber;
    } else if (
        passObj.policy.hasNumber === false &&
        passObj.policy.hasMixChar === true &&
        passObj.policy.hasSpecial === true
    ) {
        isStrength = isMixChar && isSpecial;
    } else if (
        passObj.policy.hasNumber === false &&
        passObj.policy.hasMixChar === true &&
        passObj.policy.hasSpecial === false
    ) {
        isStrength = isMixChar;
    } else if (
        passObj.policy.hasNumber === false &&
        passObj.policy.hasMixChar === false &&
        passObj.policy.hasSpecial === true
    ) {
        isStrength = isSpecial;
    } else if (
        passObj.policy.hasNumber === false &&
        passObj.policy.hasMixChar === false &&
        passObj.policy.hasSpecial === false
    ) {
        isStrength = true;
    }

    if (isLength === false) {
        retObj.err = true;
        retObj.mess =
            'Password length must be between ' +
            passObj.policy.min +
            ' and ' +
            passObj.policy.max;
    } else if (isStrength === false) {
        retObj.err = true;
        if (passObj.policy.hasNumber === true && isNumber === false)
            retObj.mess = 'Password must contain at least one number';
        else if (passObj.policy.hasMixChar === true && isMixChar === false)
            retObj.mess =
                'Password must contain upper and lowercase characters';
        else if (passObj.policy.hasSpecial === true && isSpecial === false)
            retObj.mess =
                'Password must contain at least one special charcaters like [!#@$%^&*)(+=._-]';
    } else {
        retObj.err = false;
        retObj.mess = 'Password is OK';
    }

    return retObj;
};
