import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../../configs/editorConfig';

const ContentEditor = ({ content, onChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Nội dung bài viết
                </label>

                <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[650px] ckeditor-content">
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfig}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            onChange(data);
                        }}
                        onReady={(editor) => {
                            const editableElement = editor.editing.view.document.getRoot();
                            editor.editing.view.change(writer => {
                                writer.setStyle('min-height', '650px', editableElement);
                            });
                            console.log('CKEditor is ready to use!', editor);
                        }}
                        onError={(error, { willEditorRestart }) => {
                            console.error('CKEditor error:', error);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;