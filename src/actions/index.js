import { SIGN_IN, SIGN_OUT} from './types';

//Two action creators for SignIn and SignOut
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};