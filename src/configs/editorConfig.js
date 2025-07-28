import { MyCustomUploadAdapterPlugin } from "../utils/myUploadAdapter";

export const editorConfig = {
    licenseKey: 'GPL',
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: [
        'heading',
        '|',
        'bold', 'italic', 'underline', 'strikethrough',
        '|',
        'link',
        '|',
        'bulletedList', 'numberedList',
        '|',
        'outdent', 'indent',
        '|',
        'imageUpload', 'insertTable', 'blockQuote',
        '|',
        'mediaEmbed',
        '|',
        'undo', 'redo',
        '|',
        'sourceEditing'
    ],

    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
        ]
    },

  
    image: {
        toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
        ]
    },

    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ]
    },

    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },

    placeholder: 'Viết nội dung bài báo của bạn...',

    
};


// helper để lấy danh sách người dùng cho mention
// export const getUserMentions = (queryText) => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const users = [
//                 { id: '@admin', name: 'Admin', avatar: '/avatars/admin.jpg' },
//                 { id: '@editor', name: 'Editor', avatar: '/avatars/editor.jpg' },
//                 // ... more users
//             ];
            
//             const filteredUsers = users.filter(user => 
//                 user.name.toLowerCase().includes(queryText.toLowerCase())
//             );
            
//             resolve(filteredUsers);
//         }, 100);
//     });
// };