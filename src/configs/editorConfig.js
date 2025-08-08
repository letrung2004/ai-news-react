import { MyCustomUploadAdapterPlugin } from "../utils/myUploadAdapter";

export const editorConfig = {
    licenseKey: 'GPL',
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: [
        'heading',
        '|',
        'bold', 'italic',
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
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
        ],
        styles: [
            'inline',
            'alignCenter',
            'alignLeft',
            'alignRight',
            'side'
        ],
        resizeOptions: [
            {
                name: 'resizeImage:original',
                label: 'Original size',
                value: null
            },
            {
                name: 'resizeImage:50',
                label: '50%',
                value: '50'
            },
            {
                name: 'resizeImage:75',
                label: '75%',
                value: '75'
            }
        ],
        resizeUnit: '%'
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

