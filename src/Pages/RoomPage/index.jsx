import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

import './index.css';
import { HOME_ROUTE, AUTH_ROUTE, ROOM_ROUTE } from '../../Constants/routes';
import LinkTo from '../../Components/Link/index';
import { editUrl, playingVideo, playedTime, roomName, roomAdd, roomClear} from '../../Store/Actions/roomActions';
import RoomList from './roomList';
import CreateRoomModal from './createRoomModal';
import InviteCodeModal from './inviteCodeModal';
import RoomSettingsModal from './roomSettingsModal';
import RoomDeleteConfirmModal from './roomDeleteConfirmModal';
import RoomLeaveConfirmModal from './roomLeaveConfirmModal';
import DropDownMenu from '../../Components/DropDownMenu';
import Chat from './chat/index';

const endpoint = "http://localhost:8000";
const socket = socketIOClient(endpoint);

let roomId;

class RoomPage extends React.Component {
  constructor() {
    super()
    this.state = {
      search: '',
      isOpenInvite: false,
      isOpencreateRoom: false,
      isOpenRoomSettings: false,
      isOpenRoomDeleteConfirm: false,
      isOpenRoomLeaveConfirm: false,
      inviteCode: '',
      roomName: '',
      isOwner: false,
      inviteCodeInRoom: 'Хочешь пригласить друзей?',
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    roomId = this.props.match.params.roomId;
    this.props.roomClear();

    if (roomId) {
      axios({
        method: 'get',
        url: endpoint + `/api/v1/rooms/${roomId}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.props.editUrl(response.data.url);
          this.props.playingVideo(response.data.playerStatus);
          this.props.playedTime(response.data.playedTime);
          this.props.roomName(response.data.name);
          if(response.data.playedTime !== 0){
            this.player.seekTo(response.data.playedTime, 'seconds');
          }
          if(response.data.owner === this.props.userStore.user.id){
            this.setState({
              isOwner: true
            })
          }
          socket.emit('onEnterRoom', roomId);
        })
        .catch(error => {
          console.log(error);
          toast.error("Не удалось загрузить данные.");
          setTimeout(()=> this.props.history.push("/"), 1000)
        });
        axios({
          method: 'get',
          url: endpoint + `/api/v1/messages/room/${roomId}`,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(response => {
              console.log(response);
              this.setState({
                  messages: response.data
              })
          })
          .catch(error => {
            console.log(error);
            toast.error("Не удалось загрузить данные чата.");
          });
        axios({
          method: 'get',
          url: endpoint + `/api/v1/invites/${roomId}`,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(response => {
            if(response.data.status){
              this.setState({
                inviteCodeInRoom: `Многоразовый код: ${response.data.code}`
              })
            }
          })
          .catch(error => {
            console.log(error);
            toast.error("Не удалось получить инвайт код.");
          });
    } else {
      axios({
        method: 'get',
        url: endpoint + `/api/v1/rooms`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(response => {
          for(let i = 0; i < response.data.length; i++){
            this.props.roomAdd({ id: response.data[i]._id, name: response.data[i].name })
          }
          this.props.roomName('Room page');
        })
        .catch(error => {
          console.log(error);
          toast.error("Не удалось загрузить данные.");
        });
    }
    socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    })
    socket.on('updatePlayerStatus', (status) => {
      this.props.playingVideo(status);
    })
    socket.on('updateRoomUrl', (url) => {
      this.props.editUrl(url);
    })
    socket.on('updatePlayedTime', (time) => {
      this.props.playedTime(time);
      this.player.seekTo(time, 'seconds');
    })
  }

  componentWillUnmount() {
    if (roomId) {
      socket.emit('onLeaveRoom', roomId);
      this.setState({
        isOwner: false
      })
    }
  }

  ref = player => {
    this.player = player;
  }

  handleUpdateUrl = (newUrl) => {
    this.props.editUrl(newUrl);
    socket.emit('onEditUrl', { roomId, newUrl });
  }

  handleUpdateSearch = (search) => {
    this.setState({
      search
    })
  }

  handleUpdateInviteCode = (inviteCode) => {
    this.setState({
      inviteCode
    })
  }

  handleUpdateRoomName = (roomName) => {
    this.setState({
      roomName
    })
  }

  updateInviteState = () => {
    this.setState({
      isOpenInvite: !this.state.isOpenInvite,
      inviteCode: ''
    });
  }

  updatecreateRoomState = () => {
    this.setState({
      isOpencreateRoom: !this.state.isOpencreateRoom,
      roomName: ''
    });
  }

  updateRoomSettingState = () => {
    this.setState({
      isOpenRoomSettings: !this.state.isOpenRoomSettings,
    });
  }

  onUpdateRoomDeleteConfirmState = () => {
    this.setState({
      isOpenRoomDeleteConfirm: !this.state.isOpenRoomDeleteConfirm,
    });
  }
  
  onUpdateRoomLeaveConfirmState = () => {
    this.setState({
      isOpenRoomLeaveConfirm: !this.state.isOpenRoomLeaveConfirm,
    });
  }

  inviteToRoom = () => {
      axios({
        method: 'patch',
        url: endpoint + `/api/v1/rooms/join`,
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        data: {
          invite: this.state.inviteCode
        }
      })
        .then(response => {
          this.props.roomAdd({ id: response.data._id, name: response.data.name })
          toast.success(`Вы успешно вошли в комнату "${response.data.name}"`);
          this.updateInviteState();
        })
        .catch(error => toast.error("Инвайт-код неверен."));

  }

  createRoom = () => {
    axios({
      method: 'post',
      url: endpoint + `/api/v1/rooms`,
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      data: {
        name: this.state.roomName
      }
    })
      .then(response => {
        this.props.roomAdd({ id: response.data._id, name: response.data.name })
        toast.success(`Вы создали комнату "${response.data.name}"`);
        this.updatecreateRoomState();
      })
      .catch(error => toast.error("Комната с таким названием уже существует."));
  }

  getInviteCode = () => {
    axios({
      method: 'patch',
      url: endpoint + `/api/v1/invites/${roomId}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({
          inviteCodeInRoom: `Многоразовый код: ${response.data}`
        })
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось получить инвайт код.");
      });
  }

  closeInvite = () => {
    axios({
      method: 'patch',
      url: endpoint + `/api/v1/invites/${roomId}/reset`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({
          inviteCodeInRoom: `Хочешь пригласить друзей?`
        })
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось закрыть инвайт код.");
      });
  }

  onChangeRoomName = () => {
    axios({
      method: 'patch',
      url: endpoint + `/api/v1/rooms/${roomId}/edit`,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        name: this.state.roomName
      }
    })
      .then(response => {
        this.props.roomName(response.data);
        this.setState({
          isOpenRoomSettings: false,
          roomName: ''
        })
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось изменить название комнаты.");
      });
  }

  onDeleteRoom = () => {
    axios({
      method: 'delete',
      url: endpoint + `/api/v1/rooms/${roomId}/delete`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({
          isOpenRoomSettings: false,
          isOpenRoomDeleteConfirm: false
        })
        toast.success("Комната успешно удалена.");
        this.props.history.push("/rooms");
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось удалить комнату.");
      });
  }

  onLeaveFromRoom = () => {
    axios({
      method: 'patch',
      url: endpoint + `/api/v1/rooms/${roomId}/leave`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({
          isOpenRoomLeaveConfirm: false
        })
        toast.success(`Вы успешно покинули комнату "${response.data.name}".`);
        this.props.history.push("/rooms");
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось покинуть комнату.");
      });
  }

  sendMessage(msg) {
    axios({
      method: 'post',
      url: endpoint + `/api/v1/messages/room/${roomId}`,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        text: msg
      }
    })
      .then(response => {
        const message = {
          _id: response.data._id,
          username: response.data.username,
          text: response.data.text,
          roomId: response.data.roomId
        }
        this.receivedMessage(message);
        socket.emit('msgToServer', message);
      })
      .catch(error => {
        console.log(error);
        toast.error("Не удалось отправить сообщение.");
      });
  }

  receivedMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  onStartPlaying = () => {
    socket.emit('onPause', { roomId, status: true });
  }

  onStopPlaying = () => {
    socket.emit('onPause', { roomId, status: false });
    if (this.props.roomStore.playedTime !== 0) {
      socket.emit('onPlayedTime', { roomId, playedTime: this.props.roomStore.playedTime });
    }
  }

  onProgress = (data) => {
    this.props.playedTime(data.playedSeconds);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>{roomId ? this.props.roomStore.roomName : "Room page"}</h1>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-black">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <LinkTo to={HOME_ROUTE} linkTitle="Home" />
            </li>
            {roomId ? 
              <li className="nav-item active">
                <LinkTo to={ROOM_ROUTE} linkTitle="Rooms" /> 
              </li>
              : 
              '' 
            }
          </ul>
          <div>
            {
              !this.props.userStore.loggedIn ? 
                <LinkTo to={AUTH_ROUTE} linkTitle="Auth" /> 
              : 
                <DropDownMenu updateInviteState={this.updateInviteState}/>
            }
          </div>
        </nav>

        <div className={roomId ? "inputUrl" : "hidden"}>
        { this.state.isOwner ?
            <Button style={{float: 'left'}} onClick={this.updateRoomSettingState}>Настройки</Button>
            : 
            ''
          }
          <label>Url:</label>
          <input value={this.props.roomStore.url} onChange={(event) => this.handleUpdateUrl(event.target.value)} />
          <Button variant='secondary' style={{float: 'right'}} onClick={this.onUpdateRoomLeaveConfirmState}>Выйти</Button>
        </div>

        <div className="content">
          <div className={roomId ? "hidden" : "headerList"}>
            <h2>Список комнат:</h2>
            <input className="searchInput" type="text" className="searchInput" placeholder="Search..." onChange={(event) => this.handleUpdateSearch(event.target.value)} />
          </div>

          <div className={roomId ? "hidden" : "roomList"}>
            <RoomList rooms={this.props.roomStore.rooms} search={this.state.search} enterRoom={this.enterRoom} />
          </div>

          <div className={roomId ? "player" : "hidden"}>
            <ReactPlayer onProgress={this.onProgress} ref={this.ref} onPlay={this.onStartPlaying} onPause={this.onStopPlaying} playing={this.props.roomStore.playerStatus} width="100%" height="100%" url={this.props.roomStore.url} controls />
          </div>

          <div className={roomId ? "chat" : "hidden"}>
            <Chat user={this.props.userStore.user.username} sendMessage={this.sendMessage} messages={this.state.messages} />
          </div>

          <div className={roomId ? "hidden" : "createRoom"}>
            <button type="button" className="btn btn-outline-primary createRoomButton" onClick={this.updatecreateRoomState}>Create room</button>
          </div>

          <div className={roomId && this.state.isOwner ? "invite" : "hidden"}>
            <h5>{this.state.inviteCodeInRoom}</h5>
              <Button 
                onClick={this.state.inviteCodeInRoom === 'Хочешь пригласить друзей?' ? this.getInviteCode : this.closeInvite}>
                  {this.state.inviteCodeInRoom === 'Хочешь пригласить друзей?' ? 'Invite code' : 'Close invite'}
              </Button>
          </div>
        </div>

        {this.state.isOpenInvite ?
          <InviteCodeModal 
            isOpen={this.state.isOpenInvite} 
            updateInviteState={this.updateInviteState} 
            handleUpdateInviteCode={this.handleUpdateInviteCode} 
            inviteToRoom={this.inviteToRoom}
          />
          :
          ''
        }

        {this.state.isOpencreateRoom ?
          <CreateRoomModal 
            isOpen={this.state.isOpencreateRoom} 
            updatecreateRoomState={this.updatecreateRoomState} 
            handleUpdateRoomName={this.handleUpdateRoomName} 
            createRoom={this.createRoom}
          />
          :
          ''
        }

        {this.state.isOpenRoomSettings ?
          <RoomSettingsModal
            isOpen={this.state.isOpenRoomSettings} 
            roomName={this.props.roomStore.roomName}
            onUpdateRoomDeleteConfirmState={this.onUpdateRoomDeleteConfirmState} 
            handleUpdateRoomName={this.handleUpdateRoomName}
            updateRoomSettingState={this.updateRoomSettingState} 
            onChangeRoomName={this.onChangeRoomName}
          />
          :
          ''
        }

        {this.state.isOpenRoomDeleteConfirm ?
          <RoomDeleteConfirmModal
            isOpen={this.state.isOpenRoomDeleteConfirm} 
            onUpdateRoomDeleteConfirmState={this.onUpdateRoomDeleteConfirmState} 
            onDeleteRoom={this.onDeleteRoom}
          />
          :
          ''
        }

        {this.state.isOpenRoomLeaveConfirm ?
          <RoomLeaveConfirmModal
            isOpen={this.state.isOpenRoomLeaveConfirm} 
            onUpdateRoomLeaveConfirmState={this.onUpdateRoomLeaveConfirmState} 
            onLeaveFromRoom={this.onLeaveFromRoom}
          />
          :
          ''
        }   

        <div className="footer">
          <h2>Footer</h2>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  roomStore: state.roomStore,
  userStore: state.userStore
});

const mapDispatchToProps = {
  playingVideo,
  editUrl,
  playedTime,
  roomName,
  roomAdd,
  roomClear
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);