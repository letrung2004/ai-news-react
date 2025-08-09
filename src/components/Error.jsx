export const Error = ({ message, onRetry }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
            <p className="text-red-600 mb-4">Lỗi: {message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Tải lại
                </button>
            )}
        </div>
    </div>
);