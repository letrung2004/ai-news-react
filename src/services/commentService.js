import { ENDPOINTS } from "../configs/api";
import { API, AUTH_REQUEST } from "../configs/axios";

export const commentService = {
    // get all article comment
    getAllCommentByArticle: async (articleId) => {
        const response = await API.get(ENDPOINTS.NEWS.GET_COMMENTS(articleId));
        return response.data;
    },

    //create comment
    createCommentArticle: async (commentData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.NEWS.CREATE_COMMENT, commentData);
        return response.data;
    },

    //get all comment
    getComments: async (page = 1) => {
        const response = await AUTH_REQUEST.get(`${ENDPOINTS.ADMIN.GET_ALL_COMMENTS}?page=${page}`);
        return response.data.result;
    },

    //delete comment
    deleteComment: async (commentId) => {
        await AUTH_REQUEST.delete(ENDPOINTS.ADMIN.DELETE_COMMENT(commentId));
    },

    //approve comment
    approveComment: async (commentId) => {
        const response = await AUTH_REQUEST.put(ENDPOINTS.ADMIN.APPROVE_COMMENT(commentId));
        return response.data;
    },

    //reject comment
    rejectComment: async (commentId) => {
        const response = await AUTH_REQUEST.put(ENDPOINTS.ADMIN.REJECT_COMMENT(commentId));
        return response.data;
    },

};
