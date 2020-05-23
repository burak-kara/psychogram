import moment from 'moment';
import Star, { Rate } from '../assets/starLogo/star';

// Returns data keys from snapshot.val()
export const getKeys = data => Object.keys(data);

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
