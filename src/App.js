import { useState, useEffect } from "react";
import "./App.css";
import Messages from "./components/Messages";

const names = ['Ivana', 'Valentina', 'Mirko', 'Stipe', 'Maja', 'Petar', 'Ana', 'Zlatko', 'Anita', 'Josip', 'Bojan', 'Loreta', 'Andrea', 'Mihael', 'Mihaela', 'Lea', 'Leo', 'Tea', 'David', 'Milan', 'Kristina', 'Adriano', 'Goran', 'Ivan', 'Ivica', 'Karla', 'Ivo', 'Jela', 'Lucija', 'Marijana', ];

const surnames = ['Ivanic', 'Valentin', 'Markic', 'Stipetic', 'Majic', 'Petric', 'Anic', 'Zlatic', 'Anic', 'Josipovic', 'Bojanic', 'Loric', 'Mihalic', 'Lesic', 'milanovic', 'Gorcic', 'Jelic', 'Lucijanic', 'Ivic', 'Karlic', 'Sipic', 'Martic', 'Bacic', 'Baric', 'Sladic'];

const fullName = names[Math.floor(Math.random() * names.length)] + " " + surnames[Math.floor(Math.random() * surnames.length)];

const color = () => {return '#' + Math.floor(Math.random()*16777215).toString(16)};

const drone = new window.Scaledrone("qp0gEkDFaI6eWuaz", {
  data: {name: fullName, color: color()}
});
const room = drone.subscribe("observable-chatRoom");

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([])

  const onChange = (e) => {
    setText(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    if (text.trim() === "") {
      alert("No message")
    }else {
      drone.publish({
        room: "observable-chatRoom",
        message: text
      });
    }
  }

  useEffect(() => {
    drone.on('open', error => {
      if (error) {
        return console.log(error);
      }
    });

    room.on('open', error => {
      if (error) {
        return console.error(error)
      }else {
        console.log('Connected')
      }
    });

    room.on('data', (data, member) => {
      const message = messages;
      message.push({text: data, member, user: fullName});
      setMessages([...message])
    });
  },[])

  return (
    <div id="main">
      <h1>ChatApp</h1>
      <Messages messages={messages}/>
      <form onSubmit={(e) => onSubmit(e)}>
                <input
                    onChange={(e) => onChange(e)}
                    value={text}
                    type="text"
                    placeholder="Enter your message"
                    autoFocus={true}
                />
                <button><i className="fa fa-send"></i></button>
            </form>
    </div>
  )
}

export default App;
