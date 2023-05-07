import React, { useRef, useEffect } from "react";

const TextEditor = ({ socket }) => {
  const editorRef = useRef(null);
  
  useEffect(() => {
    console.log('TextEditor effect, has socket?', !!socket);

    if (!socket) {
      return;
    }

    socket.on('text-update', (updatedText) => {
      editorRef.current.innerHTML = updatedText;

    });

    return () => {
      socket.off('text-update');
    };
  }, [socket]);

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
