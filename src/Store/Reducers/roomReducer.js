import { initialStateRoom } from "../initialState";
import { EDIT_URL, PLAYER_STATUS, PLAYED_TIME, ROOM_NAME, ROOM_ADD, ROOM_CLEAR, ROOM_LIST } from "../Actions/roomActions";

function roomReducer(state = initialStateRoom, action) {
    switch (action.type) {
      case EDIT_URL:
        return Object.assign({}, state, {
          url: action.payload
        })
      case PLAYER_STATUS:
        return Object.assign({}, state, {
          playerStatus: action.payload
        })
      case PLAYED_TIME:
        return Object.assign({}, state, {
          playedTime: action.payload
        })
      case ROOM_NAME:
        return Object.assign({}, state, {
          roomName: action.payload
        })
      case ROOM_ADD:
        return Object.assign({}, state, {
          rooms: [
            ...state.rooms, 
            action.payload]
        })
      case ROOM_CLEAR:
        return Object.assign({}, state, {
          rooms: []
      })
      case ROOM_LIST:
        return Object.assign({}, state, {
          rooms: {id: action.payload.id, name: action.payload.name}
      })
      default:
        return state
    }
  }

  export default roomReducer;
