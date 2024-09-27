import { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";

const WEBSOCKET_URL = "ws://localhost:8000/ws";

const useVoiceAssistant = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState([]);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isAudioComplete, setIsAudioComplete] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [socket, setSocket] = useState(null);
    const recorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const currentAudioSourceRef = useRef(null);

    const initializePlaybackAudioContext = () => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 22050, // Set sample rate for playback
        });
    };

    const startRecording = async () => {
        try {
            const ws = new WebSocket(WEBSOCKET_URL);
            setSocket(ws);
            ws.onopen = () => console.log("WebSocket connected");
            ws.onmessage = handleWebSocketMessage;
            ws.onerror = (error) => console.error("WebSocket error:", error);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });

            // Initialize speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const speechRecognition = new SpeechRecognition();
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;
            speechRecognition.lang = "en-US";

            speechRecognition.onresult = () => stopAudioPlayback();

            setRecognition(speechRecognition);
            speechRecognition.start();

            // Initialize WebSocket connection
            initializeWebSocket();

            // Set up the recorder using RecordRTC
            const recorder = new RecordRTC(stream, {
                type: "audio",
                mimeType: "audio/webm",
                recorderType: RecordRTC.StereoAudioRecorder,
                timeSlice: 100,
                desiredSampRate: 16000,
                numberOfAudioChannels: 1,
                bufferSize: 4096,
                ondataavailable: (blob) => {
                    if (socket && socket.readyState === WebSocket.OPEN) {
                        socket.send(blob);
                    } else {
                        ws.send(blob);
                    }
                },
            });

            recorderRef.current = recorder;
            recorder.startRecording();
            setIsRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording();
            setIsRecording(false);
            recorderRef.current = null;
        }

        if (recognition) {
            recognition.stop();
            setRecognition(null);
        }

        if (socket) {
            socket.close(1000, "Client initiated closure");
        }

        stopAudioPlayback();
    };

    const initializeWebSocket = () => {
        const ws = new WebSocket(WEBSOCKET_URL);
        setSocket(ws);
        ws.onopen = () => console.log("WebSocket connected");
        ws.onmessage = handleWebSocketMessage;
        ws.onerror = (error) => console.error("WebSocket error:", error);
    };

    const handleWebSocketMessage = async (event) => {
        if (typeof event.data === "string") {
            setMessages((prevMessages) => [...prevMessages, event.data]);

            if (event.data === "END_OF_AUDIO") {
                setIsAudioComplete(true);
            }
        } else if (event.data instanceof Blob) {
            const arrayBuffer = await event.data.arrayBuffer();
            setAudioChunks((prevChunks) => [...prevChunks, arrayBuffer]);
        }
    };

    const stopAudioPlayback = () => {
        if (currentAudioSourceRef.current) {
            currentAudioSourceRef.current.stop();
            currentAudioSourceRef.current.disconnect();
            currentAudioSourceRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().then(() => {
                audioContextRef.current = null;
            });
        }
    };

    const processCompleteAudio = async () => {
        if (!isAudioComplete) return;

        stopAudioPlayback();
        initializePlaybackAudioContext();

        // Concatenate all audio chunks
        const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
        const completeAudioBuffer = new ArrayBuffer(totalLength);
        const uint8Array = new Uint8Array(completeAudioBuffer);
        let offset = 0;

        audioChunks.forEach((chunk) => {
            uint8Array.set(new Uint8Array(chunk), offset);
            offset += chunk.byteLength;
        });

        try {
            const audioBuffer = await audioContextRef.current.decodeAudioData(completeAudioBuffer);
            playAudio(audioBuffer);
        } catch (error) {
            console.error("Error decoding complete audio data:", error);
        }

        setAudioChunks([]);
        setIsAudioComplete(false);
    };

    const playAudio = (audioBuffer) => {
        initializePlaybackAudioContext();

        const sourceNode = audioContextRef.current.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(audioContextRef.current.destination);
        sourceNode.start(0);

        sourceNode.onended = () => {
            currentAudioSourceRef.current = null;
        };

        currentAudioSourceRef.current = sourceNode;
    };

    useEffect(() => {
        initializeWebSocket();
        return () => {
            if (isRecording) {
                stopRecording();
            }
        };
    }, []);

    const  handler = async() => {
        await processCompleteAudio();
    }

    useEffect(() => {
        handler();
    }, [isAudioComplete]);

    return {
        isRecording,
        startRecording,
        stopRecording,
        messages,
    };
};

export default useVoiceAssistant;
