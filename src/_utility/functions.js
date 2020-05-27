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

export const passCheck = object => {
    const response = {
        err: true,
        mess: '',
    };

    const policy = object.policy;
    const password = object.passwd;

    const isNumber = hasNumber(password);
    const isMixChar = hasMixed(password);
    const isSpecial = hasSpecial(password);

    const isLength =
        Number(password.length) >= Number(policy.min) &&
        Number(password.length) <= Number(policy.max);
    const isStrength =
        (policy.hasNumber ? isNumber : true) &&
        (policy.hasMixChar ? isMixChar : true) &&
        (policy.hasSpecial ? isSpecial : true);

    if (!isLength) {
        response.mess =
            'Password length must be between ' +
            object.policy.min +
            ' and ' +
            object.policy.max;
    } else if (!isStrength) {
        response.err = true;
        if (policy.hasNumber && !isNumber)
            response.mess = 'Password must contain at least one number';
        else if (policy.hasMixChar && !isMixChar)
            response.mess =
                'Password must contain upper and lowercase characters';
        else if (policy.hasSpecial && !isSpecial)
            response.mess =
                'Password must contain at least one special characters like [!#@$%^&*)(+=._-]';
    } else {
        response.err = false;
        response.mess = 'Password is OK';
    }

    return response;
};
