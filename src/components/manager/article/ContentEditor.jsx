import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { editorConfig } from "../../../configs/editorConfig";

const ContentEditor = ({ content, onChange }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 pt-4 pb-2 border-b border-gray-50">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Nội dung bài viết
            </label>
        </div>
        <div className="ckeditor-content">
            <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={content}
                onChange={(_, editor) => onChange(editor.getData())}
                onReady={(editor) => {
                    const root = editor.editing.view.document.getRoot();
                    editor.editing.view.change((w) =>
                        w.setStyle("min-height", "600px", root)
                    );
                }}
            />
        </div>
    </div>
);

export default ContentEditor;