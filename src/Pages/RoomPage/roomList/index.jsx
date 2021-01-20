import React from 'react';
import { ROOM_ROUTE } from '../../../Constants/routes';

function roomList (props) {
    const { rooms, search } = props;
    let roomList;

    const showRooms = (item, key) => {
        return (
            <li key={key}>{item.name}
                <a href={`${ROOM_ROUTE}/${item.id}`} className="enterRoom">Войти</a>
            </li>
        )
    }

    if(String(search)){
        roomList = rooms.filter(room => String(room.name).includes(search)).map(showRooms);
    }else{
        roomList = rooms.map(showRooms);
    }
    
    if(roomList.length < 1){
        return <p style={{textAlign: 'center'}}>Вы ещё не присоединились ни к какой комнате.</p>
    }
    
    return <ul className="theList">{roomList}</ul>;

}

export default roomList;