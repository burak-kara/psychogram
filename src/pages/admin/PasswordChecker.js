var pasLen = 8;
var strength = true;
var passObj = {
    err: false,
    mess: '',
};

const hasNumber = value => {
    return new RegExp(/[0-9]/).test(value);
};

const hasMixed = value => {
    return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

const hasSpecial = value => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

export const passCheck = value => {
    let isLength = 0;
    let isNumber = 0;
    let isMixChar = 0;
    let isSpecial = 0;

    pasLen = value.pasLen;
    strength = value.strength;
    let password = value.passwd;

    if (password.length >= pasLen) isLength = 1;

    if (hasNumber(password)) isNumber = 1;

    if (hasMixed(password)) isMixChar = 1;

    if (hasSpecial(password)) isSpecial = 1;

    passObj.err = false;
    passObj.mess = '';

    if (strength == false && isLength == 1) {
        passObj.err = false;
        passObj.mess = 'Password is OK';
    } else if (isLength == 1 && isNumber == 1 && isSpecial == 1) {
        passObj.err = false;
        passObj.mess = 'Password is Strong';
    } else passObj.err = true;

    if (passObj.err) {
        if (isLength == 0)
            passObj.mess =
                'Password must be at least ' + pasLen + ' character length';
        else if (isNumber == 0)
            passObj.mess = 'Password must contain at least one number';
        else if (isMixChar == 0)
            passObj.mess =
                'Password must contain upper and lowercase characters';
        else if (isSpecial == 0)
            passObj.mess =
                'Password must contain at least one special charcaters like [!#@$%^&*)(+=._-]';
    }

    return passObj;
};
