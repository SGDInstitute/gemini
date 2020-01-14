import { AsyncStorage } from 'react-native';

import { BULLETINS_URL, LOGIN_URL, USER_URL } from '../../config/endpoints'
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT } from '../../config/settings'

export const getUser = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('bulletins', JSON.stringify(json.data));

        return {
            type: 'success',
            payload: json.data
        };
    } else {
        return {
            type: 'failure',
            payload: json.message
        }
    }
};

export const updateUser = async (data) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(USER_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('user', JSON.stringify(json.data));

        return {
            type: 'success',
            payload: json.data
        };
    } else {
        return {
            type: 'failure',
            payload: json
        }
    }
};

export const getAccessToken = async (email, password) => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'password',
            client_id: OAUTH_CLIENT_ID,
            client_secret: OAUTH_CLIENT_SECRECT,
            username: email,
            password: password,
            scope: ''
        })
    });

    const json = await response.json();

    if (json.access_token) {
        return {
            type: 'success',
            payload: json.access_token
        };
    } else {
        return {
            type: 'failure',
            payload: json.message
        }
    }
};

export const getBulletins = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(BULLETINS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('bulletins', JSON.stringify(json.data));

        return {
            type: 'success',
            payload: json.data
        };
    } else {
        return {
            type: 'failure',
            payload: json.message
        }
    }
};

