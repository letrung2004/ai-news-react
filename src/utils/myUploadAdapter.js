import { articleService } from '../services/articleService';

class myUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        const data = new FormData();
        const image = await this.loader.file;
        data.append('image', image);

        // Gọi service đã tách
        const result = await articleService.uploadImage(data);

        return {
            default: result.result.urlImage,
        };

    }

    abort() { }
}

// Hàm khởi tạo plugin
export function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new myUploadAdapter(loader);
    };
}
