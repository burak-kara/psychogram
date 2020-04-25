import moment from 'moment';

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
export const snapshotToData = (snapshot, keyField) => {
    if (!snapshot.exists) {
        return undefined;
    }

    const val = snapshot.val();
    if (isObject(val)) {
        return {
            ...val,
            ...(keyField ? { [keyField]: snapshot.key } : null),
        };
    }
    return val;
};

export const isObject = val =>
    val != null && typeof val === 'object' && Array.isArray(val) === false;
