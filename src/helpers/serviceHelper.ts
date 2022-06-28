import fetch from 'cross-fetch';
import urlConfigs from '../configs/urlConfig';

async function getApp(url: string, appID: string) {
    try {
        const urlFinal = `${url}/${appID}`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
                Authorization: `Basic ${urlConfigs().onesignalKey}`,
                'Content-Type': 'application/json',
            },
        };

        const data = await fetch(urlFinal, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

async function getListApps(url: string) {
    try {
        const urlFinal = `${url}`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
                Authorization: `Basic ${urlConfigs().onesignalKey}`,
            },
        };

        const data = await fetch(urlFinal, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

async function get(url: string, targetID: string, appID: string) {
    try {
        const urlFinal = `${url}/${targetID}?app_id=${appID}`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'text/plain; application/json',
                Authorization: `Basic ${urlConfigs().onesignalKey}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        const data = await fetch(urlFinal, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

async function getList(
    url: string,
    appID: string,
    limit: number,
    offset: number,
) {
    try {
        const urlFinal = `${url}?app_id=${appID}&limit=${limit || 10}&offset=${
            offset || 0
        }`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'text/plain; application/json',
                Authorization: `Basic ${urlConfigs().onesignalKey}`,
            },
        };

        const data = await fetch(urlFinal, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

async function post(url: string, body: any) {
    try {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                Authorization: `Basic ${urlConfigs().onesignalKey}`,
                'Content-Type': 'application/json',
            },
            body: body,
        };

        const data = await fetch(url, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}
async function deletes(url: string, targetID: string) {
    try {
        const finalUrl = `${url}/${targetID}?app_id=${
            urlConfigs().onesignalAppId
        }`;
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic YOUR_REST_API_KEY',
            },
        };
        const data = await fetch(finalUrl, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

async function put(url: string, targetID: string, body: any) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'text/plain: application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        };
        const finalUrl = `${url}/${targetID}`;
        const data = await fetch(finalUrl, options);
        const kq = data.json();
        return kq;
    } catch (error) {
        throw error;
    }
}

export default { get, getList, getApp, getListApps, post, put, deletes };
