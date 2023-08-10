import { message } from 'antd';
import { parseCookies, setCookie as setNookies, destroyCookie as destroyNookies } from 'nookies'
// var moment = require('moment');
import moment from 'moment'

export const saveToStorage = (key: any, value: any) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value);
    }
}


export const getFromStorage = (key: any) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
}
export const getFromCookie = (key: any) => {
    const cookies = parseCookies()
    if (isJson(cookies[key])) {
        return JSON.parse(cookies[key]);
    } else {
        return cookies[key];
    }
}

export const setCookie = (key: any, value: any) => {
    setNookies(null, key, value)
}
export const destroyCookie = (key: any, value: any) => {
    destroyNookies(null, key, value)
}

export const generateInitials = (name: any) => {
    if (name) {
        return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    } else {
        return "";
    }
}

export const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export const validateImage = async (file: any) => {
    return new Promise((resolve, reject) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            resolve({ status: false, message: 'You can only upload JPG/PNG and WEBP file!' })
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            resolve({ status: false, message: 'Image must smaller than 5MB!' })
        }
        resolve({ status: true, message: 'Can upload' })
    })
}

export const toSlug = (string: any) => {
    return string
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');
}

export const formatDate = (date: any, format = 'DD/MM/YY, hh:mm A') => {
    return moment(date).format(format)
}

function isJson(str: any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const toTitleCase = (str: any) => {
    if (str)
        return str.replace(/\w\S*/g, function (txt: any) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    return null
}



export const timeToSeconds: any = (time: any) => {
    if (time != null && time != undefined) {
        var parts = time.split(":");
        var hours = parseInt(parts[0]);
        var minutes = parseInt(parts[1]);
        var seconds = parseInt(parts[2]);
        return hours * 3600 + minutes * 60 + seconds;
    }
}


export const formatDuration = (duration: any) => {
    // return moment
    //   .duration(duration, "seconds")
    //   .format("mm:ss", { trim: false });
    var mins: any = Math.floor(duration / 60);
    if (mins < 10) {
        mins = "0" + String(mins);
    }
    var secs: any = Math.floor(duration % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    return mins + ':' + secs;


}
