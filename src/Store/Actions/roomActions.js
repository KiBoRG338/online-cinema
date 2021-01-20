export const EDIT_URL = "EDIT_URL";
export const PLAYER_STATUS = "PLAYER_STATUS";
export const PLAYED_TIME = "PLAYED_TIME";
export const ROOM_NAME = "ROOM_NAME";
export const ROOM_ADD = "ROOM_ADD";
export const ROOM_EXIT = "ROOM_EXIT";
export const ROOM_CLEAR = "ROOM_CLEAR";
export const ROOM_LIST = "ROOM_LIST";


export function editUrl(data) {
    return { 
        type: EDIT_URL,
        payload: data
    }
}

export function playingVideo(data) {
    return { 
        type: PLAYER_STATUS,
        payload: data
    }
}

export function playedTime(data) {
    return { 
        type: PLAYED_TIME,
        payload: data
    }
}

export function roomName(data) {
    return { 
        type: ROOM_NAME,
        payload: data
    }
}

export function roomAdd(data) {
    return { 
        type: ROOM_ADD,
        payload: data
    }
}

export function roomClear() {
    return { 
        type: ROOM_CLEAR
    }
}

export function roomList(data) {
    return { 
        type: ROOM_LIST,
        payload: data
    }
}

