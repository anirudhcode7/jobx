import { useEffect } from "react";

const SpeechToText = ({ onTranscription, isRecording }) => {
  useEffect(() => {
    let speechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!speechRecognition) {
      console.warn("SpeechRecognition is not supported in this browser");
      // Handle browsers that do not support SpeechRecognition
      alert(
        "Your browser does not support speech recognition. Please use Google Chrome."
      );
      return;
    }

    let recognition = new speechRecognition();

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      onTranscription(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isRecording, onTranscription]);

  return null;
};

export default SpeechToText;
