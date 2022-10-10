import { useEffect } from "react";

function Messages(props) {
    const showMessage = (message) => {
        const {member, text, user} = message;
        const currentMember = member.clientData.name === user;
        const className = currentMember ? 'curent' : 'other';
        const memberColor = currentMember ? {borderRight: `solid ${member.clientData.color} 7px`} : {borderLeft: `solid ${member.clientData.color} 7px`};

        return (
            <li key={Math.random()} className={className}>
                <div className="message">
                    <p className="name"><b>{member.clientData.name}</b></p>
                    <p className="text" style={memberColor}>{text}</p>
                </div>
            </li>
        )
    }
    

    return (
        <div id="messages">
            <ul>
                {props.messages.map((m) => showMessage(m))}
            </ul>
        </div>
    )
}

export default Messages;