type Routes={
    [key:string]:string
};
export const routes:Routes={
    WELCOME : '/',
    LOGIN : '/login',
    SIGNUP : '/signup',
    LOGOUT: '/logout',
    RESETPASSWORD:'/reset-password',
    ENTERNEWPASSWORD:'/new-password',
    INVITECODE: '/invite-code',
    ACTIVATEACCOUNT: '/activate',
    DASHBOARD: '/dashboard',
    BOOK: '/book',
    CHECKOUT: '/payment',
    PROGRESS: '/progress',
    MESSAGES: '/messages',
    HELP: '/help',
    CONTACT: '/contact',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_OF_SERVICE: '/terms-of-service',
    PRIVACY: '/privacy-policy',
    TERMS: '/terms-of-service',
    ERROR: '/error',
    PAYMENT_SUCCESS:'/payment-success',
    PAYMENT_FAILED:'payment-failed',
    NO_PAGE_FOUND: '*'
}