
 export const urls ={
   
    USER_SIGNUP: 'auth/user/signup',
    USER_LOGIN: 'auth/user/login',
    AGENT_SIGNUP: 'agent/signup',
    AGENT_LOGIN: 'agent/login',
    AGENT_ADD_CATEGORY: 'agent/category-add',
    ADMIN_LOGIN: 'admin/login',
    ADMIN_GET_ALL_USERS: 'admin/get-all-users',
    ADMIN_GET_ALL_AGENTS: 'admin/get-all-agents',
    ADMIN_BLOCK_USER: 'admin/block-user/',
    ADMIN_BLOCK_AGENT: 'admin/block-agent/',
    ADMIN_GET_ALL_UNVERIFIED_AGENTS: 'admin/get-all-unverified-agents',
    ADMIN_VERIFY_AGENTS: 'admin/agent-verification/',
    AGENT_GET_ALL_CATEGORY: 'agent/get-all-category/',
    AGENT_DELETE_CATEGORY: 'agent/delete-category',
    AGENT_ADD_PACKAGE: 'agent/add-tour-package',
    AGENT_GET_ALL_PACKAGES: 'agent/get-all-package/',
    USER_GET_ALL_PACKAGES: 'auth/get-tour-packages',
    AGENT_DISABLE_PACKAGE: 'agent/disable-package/',
    AGENT_GET_PACKAGE: 'agent/get-package/',
    AGENT_UPDATE_PACKAGE: 'agent/update-package/',
    AGENT_DELETE_PACKAGE: 'agent/delete-package/',
    USER_GET_PACKAGE: 'auth/package-details/',
    USER_BOOK_PACKAGE: 'auth/book-package',
    USER_LOGIN_WITH_GOOGLE:  'auth/login-with-google',
    USER_GET_USER_DETAILS: 'auth/user-profile/'

 }
 
 const BASE_URL= 'http://localhost:8000/';

 export default BASE_URL



