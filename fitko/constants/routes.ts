type Routes={
    [key:string]:string
};
export const routes:Routes={
    WELCOME : '/',
    LOGIN : '/login',
    SIGNUP : '/signup',
    LOGOUT: '/logout',
    INVITECODE: '/invite-code',
    ACTIVATEACCOUNT: '/activate',
    DASHBOARD: '/dashboard',
    BOOK: '/book',
    PROGRESS: '/progress',
    MESSAGES: '/messages',
    HELP: '/help',
    CONTACT: '/contact',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    ERROR: '/error',
    NO_PAGE_FOUND: '*'
}