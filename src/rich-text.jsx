import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ font: [] }],
  [{ list: 'ordered'}, { list: 'bullet' }, { list: 'check' }],
  [{ script: "sub" }, { script: "super" }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['link', 'image', 'video', 'formula'],
  ["image", "blockquote", "code-block"],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

  [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
  [{ align: [] }],
  
  [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
  ["clean"],
]

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  // ============================================

  const wrapper_ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [quill, setQuill] = useState(null);

  // ============================================

  useEffect(() => {
    const editor = document.createElement("div");
    wrapper_ref.current.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    setQuill(q);
    // q?.on("text-change", (delta, oldDelta, source) => {
    //   if (source !== "user") return;
    //   console.log("quill text-change", delta, oldDelta, source);
    // });
    return () => wrapper_ref.innerHTML = '';
  }, []);

  // ============================================

  return (
    <>
      <div 
        id="container"
        ref={wrapper_ref}
      >
      </div>
      <button
        onClick={() => {
          // const contents = quill.getContents();
          // console.log("quill contents", contents);

          const html = quill.getSemanticHTML();
          console.log("quill html", html);
        }}
      >
        Save Contents
      </button>
    </>
  );
};