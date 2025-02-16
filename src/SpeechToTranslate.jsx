import { useState, useEffect} from "react";


export default function SpeechToTranslate() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "th-TH";
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setText2(speechResult);
      setText(speechResult);
      translateText(speechResult);
    };

    recognition.start();
  };


  const translateText = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.translatedText) {
        setText(data.translatedText);  
        speakText(data.translatedText);
      }
      
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };



  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; 
    window.speechSynthesis.speak(speech);
  };
  
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Speech Translation App</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Start"}
      </button>
      <p className="mt-4">The message we speak: {text2}</p>
      <p className="mt-4">The translated message: {text}</p>
    </div>
  );
}
