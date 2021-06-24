import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function App() {
  const Socket = io("http://150.95.113.87:3002");

  const [listMessages, setListMessages] = useState();
  const [text, setText] = useState('')
  useEffect(()=>{
    fetch('(http://150.95.113.87.3002/api/v1/players/getMessagesByChannel',{
      method: 'DIEN VAO',
      body: {
        data: 'DIEN VAO',
      }
    })
    //DIEN VAO Chỉ lấy danh sách messages, giả sử results trả về là 1 mảng message thì sẽ thế này:
      .then(results =>setListMessages(results))
      .catch(e => console.log(e) )
  },[])

  const sendMessage = ()=>{
    //DIEN VAO 2 biến kia, đây là hàm gọi mỗi lần mình gửi tin nhắn
    Socket.emit('insertMessage', ({PlayerMatchPosition._id, ChatChannel._id, message}));
  }


Socket.on('messageFromServer', ({message}) => {
	const { player_match_position_id ,chat_channel_id, message } = message
	const newMessages = messagesHistory.concat(message);
  //DIEN VAO Chỉ lấy danh sách messages, giả sử results trả về là 1 mảng message thì sẽ thế này:
	setListMessages(newMessages)
})

  const RenderListMessages = ()=>{
    if(listMessages){
      return listMessages.map(message => <div>{message}</div>)
    }
  }

  return (
    <div className="App">
      {RenderListMessages()}
      <input value={text} onChange={(e)=>setText(e.target.value)}></input>
      <button onClick={()=>sendMessage()}>Send</button>
    </div>
  );
}

export default App;
