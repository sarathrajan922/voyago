
 export const urls ={
   
    USER_SIGNUP: 'api/auth/user/signup',
    USER_LOGIN: 'api/auth/user/login',
    AGENT_SIGNUP: 'api/agent/signup',
    AGENT_LOGIN: 'api/agent/login',
    AGENT_ADD_CATEGORY: 'api/agent/category-add',
    ADMIN_LOGIN: 'api/admin/login',
    ADMIN_GET_ALL_USERS: 'api/admin/get-all-users',
    ADMIN_GET_ALL_AGENTS: 'api/admin/get-all-agents',
    ADMIN_BLOCK_USER: 'api/admin/block-user/',
    ADMIN_BLOCK_AGENT: 'api/admin/block-agent/',
    ADMIN_GET_ALL_UNVERIFIED_AGENTS: 'api/admin/get-all-unverified-agents',
    ADMIN_VERIFY_AGENTS: 'api/admin/agent-verification/',
    AGENT_GET_ALL_CATEGORY: 'api/agent/get-all-category/',
    AGENT_DELETE_CATEGORY: 'api/agent/delete-category',
    AGENT_ADD_PACKAGE: 'api/agent/add-tour-package',
    AGENT_GET_ALL_PACKAGES: 'api/agent/get-all-package/',
    USER_GET_ALL_PACKAGES: 'api/auth/get-tour-packages',
    AGENT_DISABLE_PACKAGE: 'api/agent/disable-package/',
    AGENT_GET_PACKAGE: 'api/agent/get-package/',
    AGENT_UPDATE_PACKAGE: 'api/agent/update-package/',
    AGENT_DELETE_PACKAGE: 'api/agent/delete-package/',
    USER_GET_PACKAGE: 'api/auth/package-details/',
    USER_BOOK_PACKAGE: 'api/auth/book-package',
    USER_LOGIN_WITH_GOOGLE:  'api/auth/login-with-google',
    USER_GET_USER_DETAILS: 'api/auth/user-profile',
    USER_UPDATE_PROFILE: 'api/auth/user-profile-update',
    USER_GET_TOUR_BOOKED_DETAILS: 'api/auth/user-get-package-booked-data/',
    USER_GET_ALL_BOOKING: 'api/auth/user-get-all-bookings',
    USER_PAYMENT_STATUS_CHANGE: 'api/auth/user-Pay-status-change',
    AGENT_GET_ALL_BOOKING: 'api/agent/get-all-booking',
    AGENT_VERIFICATION_CHECK: 'api/agent/isVerified',
    AGENT_GET_PROFILE: 'api/agent/get-profile',
    AGENT_UPDATE_PROFILE: 'api/agent/agent-profile-update',
    USER_GET_ALERT_MESSAGES: 'api/auth/user-get-alert-messages',
    AGENT_CREATE_ALERT_MESSAGE: 'api/agent/alert-message',
    USER_CREATE_COMMUNITY: 'api/auth/user-create-community',
    USER_GET_ALL_COMMUNITIES: 'api/auth/get-all-community',
    USER_JOIN_COMMUNITY:'api/auth/join-community',
    USER_GET_ALL_JOINED_AND_NOT_JOINED_COMMUNITY: 'api/auth/getAlluserJoinedAndNotJoinedcommunity',
    USER_CREATE_CONVERSATION: 'api/auth/create-conversation',
    USER_GET_ALL_CONVERSATION_COMMUNITY: 'api/auth/get-all-coversation/',
    ADMIN_GET_BASIC_DETAILS_USER_AGENT_PACKAGE: 'api/admin/get-basic-details-user-agent',
    ADMIN_GET_AGENTS_STATUS: 'api/admin/get-all-agents-status',
    ADMIN_GET_BOOKING_STAT: 'api/admin/get-all-booking-stat',
    AGENT_GET_ALL_BOOKING_STAT: 'api/agent/get-all-bookingStat',
    USER_GET_ALL_UNIQUE_CATEGORIES: 'api/auth/get-all-unique-category',
    ADMIN_GET_REVENUE: 'api/admin/get-revenu',
    AGENT_GET_REVENUE: 'api/agent/get-agent-revenue',
    AGENT_GET_USERCOUNT_BOOKINGCOUNT: 'api/agent/get-userCount-successBookingCount',
    USER_UPDATE_PASSWORD: 'api/auth/user-password-update',
    USER_REQUEST_OTP: 'api/auth/user-generate-otp',
    USER_VERIFY_OTP: 'api/auth/verify-otp',
    USER_UPDATE_PASSWORD_WITH_EMAIL: 'api/auth/user-password-update-withEmail'
 }
 
 const BASE_URL= 'api/https://voyago.site/8000';

 export default BASE_URL;



