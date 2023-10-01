// socket logic file

import React, { createContext, useStyles, useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {  //use State
    const [stream, setstream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');



    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();



    useEffect(() => { 
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })  // user permission to allow video and audio
            .then((currentStream) => {
                setstream(currentStream);  // setstream

                myVideo.current.srcObject = currentStream;

            });

        socket.on('me', (id) => setMe(id));

        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });

        });

    },[]); //[]empty dependency Array  

    const answerCall = () =>{
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream }); // peer is like socket
        
        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call. signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted',(signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        })

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload(); //reload the page and provide the new id to user
    }

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall,}}>
            { children } 
        </SocketContext.Provider>
    );

}

export{ ContextProvider, SocketContext };

