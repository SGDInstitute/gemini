import { AsyncStorage } from 'react-native';

import { ACTIVITIES_URL, BULLETINS_URL, LOGIN_URL, EVENT_ID, USER_URL, USER_ACTIVITIES_URL } from '../../config/endpoints'
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

export const getActivities = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(ACTIVITIES_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('schedule', JSON.stringify(json.data));

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

export const getUserActivities = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(USER_ACTIVITIES_URL + '?event=' + EVENT_ID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        await AsyncStorage.setItem('my-schedule', JSON.stringify(json.data));

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

export const storeUserActivities = async (id) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${USER_ACTIVITIES_URL}/${id}?event=${EVENT_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('my-schedule', JSON.stringify(json.data));

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
}
