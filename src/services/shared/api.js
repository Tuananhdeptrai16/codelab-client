const API = {
    API_ME : '/v1/users/me',
    API_LOGIN : '/v1/users/login',
    API_REGISTER : '/v1/users/register',
    API_FORGOT_PASSWORD : '/v1/users/forgot-password',
    API_UPDATE_USER :'/v1/users/update-user',
    API_RESET_FORGOT_PASSWORD :'/v1/users/reset-password',
    API_VERIFY_FCODE: '/v1/users/verify-fpcode',
    API_VERIFY : '/v1/users/verify',
    API_GET_USER_INFO_BY_ID : (id) => `/v1/users/get-info/${id}`,

    API_GET_COURSES : '/v1/course', 
    API_GET_COURSE_BY_ID : (id) => `/v1/course/${id}`,
    API_POST_COURSES : '/v1/course', 
    API_UPDATE_COURSES : (id) => `/v1/course/${id}`,
    API_DELETE_COURSES : (id) => `/v1/course/${id}`,
    API_UPLOAD_IMAGE :'/v1/upload', 
    API_GET_LESSON_BY_COURSE_ID :(id) => `/v1/lesson/courses/${id}`, 
    API_DELETE_LESSON : (id) => `/v1/lesson/${id}`,
    API_POST_LESSON : '/v1/lesson',
    API_UPDATE_LESSON : (id) => `/v1/lesson/${id}`,
    API_GET_BLOG: '/v1/blog',
    API_GET_BLOG_BY_ID : (id) => `/v1/blog/${id}`,
    API_GET_BLOG_PENDING: '/v1/blog/pending', 
    API_DELETE_BLOG : (id) => `/v1/blog/${id}`,
    API_UPDATE_BlOG : (id) => `/v1/blog/${id}`,
    API_ACTIVE_BLOG :(id) => `v1/blog/pending/${id}`, 
    API_POST_BlOG : `/v1/blog`,
    API_DASHBOARD : `/v1/statistics/overview`,
    // get list all user
    API_GET_LIST_USERS : '/v1/users',
    API_ADD_QUIZ : '/v1/quiz',
    API_UPDATE_QUIZ :(id) => `/v1/quiz/${id}`,
    API_GET_QUIZ_BY_LESSON_ID : (id) => `/v1/quiz/lesson/${id}`,
    API_DELETE_QUIZ : (id) => `/v1/quiz/${id}`,
    API_GET_QUIZ_BY_ID : (id) => `/v1/quiz/${id}`,
    API_CHECK_QUIZ : '/v1/quiz/answer',
    API_LIST_QUIZ_ANSWERED : '/v2/student-data/answered-questions',

    //Trello Page 
    API_LIST_BOARD : '/v1/boards?page=1&itemsPerPage=20',
    API_ADD_BOARD : '/v1/boards', 
    API_DELETE_BOARD : '/v1/boards/delete', 
    API_GET_BOARD_DETAILS : (id) => `/v1/boards/${id}`,
    API_LIST_USER_IN_BOARD : (id) => `/v1/boards/user/${id}?page=1&itemsPerPage=7`, 
    API_GET_CARD :(boardId, columnId) => `/v1/cards/${boardId}/${columnId}`,
    API_UPDATE_BOARD :(id) => `/v1/boards/${id}`,

    //card
    API_ADD_CARD : '/v1/cards', 
    API_UPDATE_CARD : (boardId, cardId) =>  `/v1/cards/detail/${boardId}/${cardId}` , 
    API_DELETE_CARD : (id) => `/v1/cards/${id}`,

    //column
    ADD_NEW_COLUMN : '/v1/columns', 
    API_GET_COLUMN :(id) => `/v1/columns/${id}`,
    API_DELETE_COLUMN :(id) => `/v1/columns/${id}`,
    API_UPDATE_COLUMN : (boardId,  columnId) => `/v1/columns/${boardId}/${columnId}`,

    //API mời người dùng 
    API_INVITE_USER : '/v1/invitations/board',
    API_GET_INVITE_FOR_ME : '/v1/invitations',
    API_UPDATE_INVITE : (id) => `/v1/invitations/board/${id}`,

    //CHAT REAL TIME 
    API_GET_LIST_ROOM : '/socket/rooms',
    API_GET_LIST_USER : '/v1/users?page=1&itemsPerPage=100',
    API_CREATE_ROOM : '/socket/rooms',
    GET_MESSAGE_BY_ROOM_ID : (id) => `/socket/rooms/messages?roomId=${id}`
}
export default API