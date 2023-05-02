import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

const TextEditor = () => {
  const editorRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("text-update", (updatedText) => {
      editorRef.current.innerHTML = updatedText;
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleEditorChange = () => {
    socketRef.current.emit("text-change", editorRef.current.innerHTML);
  };

  const handleButtonClick = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleColorChange = (color) => {
    document.execCommand("foreColor", false, color);
    editorRef.current.focus();
  };

  const handleHighlightChange = (color) => {
    document.execCommand("hiliteColor", false, color);
    editorRef.current.focus();
  };

  return (
    <div>
      <div className="formatting-menu">
        <button onClick={() => handleButtonClick("bold")}>B</button>
        <button onClick={() => handleButtonClick("italic")}>I</button>
        <button onClick={() => handleButtonClick("underline")}>U</button>
        <input
          type="color"
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <input
          type="color"
          onChange={(e) => handleHighlightChange(e.target.value)}
        />
      </div>
      <div
        className="text-editor"
        contentEditable
        spellCheck="false"
        ref={editorRef}
        onInput={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
