import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { Global, css } from "@emotion/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorComponent = ({ getDescription, value }) => {
  // console.log('value: ', value);
  const editorRef = useRef(null); 

  const ckWrapperStyle = css`
    position: relative;
    z-index: 1;
    &::before {
      color: rgba(192, 192, 192, 1);
      content: attr(data-placeholder);
      padding: 0 11px;
      position: absolute;
      margin: var(--ck-spacing-large) 0;
      top: 0;
      z-index: -1;
    }
  `;

  const editorContent = (event, editor) => {
    const data = editor.getData();
    getDescription({ event, editor, data });
  };

  return (
    <div className="ckeditor-wrapper" css={css` ${ckWrapperStyle} `} >
      <Global
        styles={css`
          :root {
            --ck-border-radius: 4px;
            --ck-color-focus-border: rgba(96, 103, 113, 0.8);
            --ck-color-shadow-inner: rgba(69, 79, 99, 0.2);
            --ck-inner-shadow: 0 0 0 2px var(--ck-color-shadow-inner);
            --ck-spacing-large: var(--ck-spacing-standard);
          }
          .ck.ck-editor__editable_inline {
            border: 1px solid rgba(217, 217, 217, 1);
            min-height: 160px;
            transition: all 0.3s;
            &:hover {
              border-color: rgba(96, 102, 112, 1);
              border-right-width: 1px !important;
            }

            p{margin-bottom:5px}
          }
          .ck-editor__editable.ck-read-only {
            background-color: rgba(245, 245, 245, 1);
            opacity: 1;
            cursor: not-allowed;
            color: rgba(0, 0, 0, 0.25);
            &:hover {
              border-color: rgba(217, 217, 217, 1);
            }
          }
        `}
      />
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          placeholder: "Enter your content here...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "ckfinder",
            "|",
            "imageTextAlternative",
            "imageUpload",
            "imageStyle:full",
            "imageStyle:side",
            "|",
            "mediaEmbed",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "undo",
            "redo",
          ],
        }}
        onInit={(editor) => {
          editorRef.current = editor;
        }}
        onChange={editorContent}
      />
    </div>
  );
};

// Add prop validation for pageName
CKEditorComponent.propTypes = {
  getDescription: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default CKEditorComponent;
