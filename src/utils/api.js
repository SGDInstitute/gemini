import { AsyncStorage } from 'react-native';

import { ACTIVITIES_URL, BULLETINS_URL, LOGIN_URL, ORDERS_URL, QUEUE_URL, EVENT_ID, USER_URL, USER_ACTIVITIES_URL, CONTENT_URL, TICKETS_URL, EVALUATIONS_URL, GEMINI_URL, TICKETS_UPDATE_URL, LOCATIONS_URL } from '../../config/endpoints'
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
        AsyncStorage.setItem('user', JSON.stringify(json.data));

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

export const getActivities = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${ACTIVITIES_URL}`, {
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

export const getContent = async (type) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${CONTENT_URL}?type=${type}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem(type, JSON.stringify(json.data));

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

export const getEvaluations = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(EVALUATIONS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('evaluations', JSON.stringify(json.data));

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

export const getLocations = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(LOCATIONS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('locations', JSON.stringify(json.data));

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

export const getOrders = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(ORDERS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('orders', JSON.stringify(json.data));

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
};

export const storeTicket = async (form) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(TICKETS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(form),
    });

    const json = await response.json();
    const status = response.status;

    if (status === 200) {
        return {
            type: 'success',
        };
    } else {
        return {
            type: 'failure',
            payload: json.message
        }
    }
};

export const storeEvaluationResponse = async (evaluation, data) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${GEMINI_URL}/evaluations/${evaluation.id}/responses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    if (json.data) {
        AsyncStorage.setItem('responses' + evaluation.id, JSON.stringify(json.data));

        return {
            type: 'success',
            payload: json.data
        };
    } else {
        const errors = Object.keys(json.errors).map(x => {
            const question = evaluation.form.find(y => y.id === x).question;
            return `"${question}" is required`;
        });

        return {
            type: 'failure',
            payload: json.message,
            errors: errors,
        }
    }
};

export const storeTicketsInQueue = async (tickets) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${QUEUE_URL}/${tickets.join()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    });

    if (response.status === 201) {
        return {
            type: 'success',
        };
    } else {
        const json = await response.json();
        return {
            type: 'failure',
            payload: json.message,
            response: response,
        }
    }
}

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

export const updateTicket = async (hash, data) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${TICKETS_UPDATE_URL}/${hash}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(data),
    });

    if (response.status === 200) {
        return {
            type: 'success',
        };
    } else {
        const json = await response.json();
        return {
            type: 'failure',
            payload: json
        }
    }
};