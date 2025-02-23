export const ACCOUNT_ROUTE = {
    AUTHENTICATION: "/account/auth",
    REGISTRATION: "/account/reg",
    RECOVERY: "/account/recovery",
    PROFILE: "/account/profile"
};

export const ORDER_ROUTE = {
    BOOKING: "/order/booking",
    LIST: "/order/list"
};

export const COMPANY_ROUTE = {
    CREATE: "/company/create",
    CABINET: "/company/cabinet",
    DATA: "/company/data",
    SERVICE: "/company/service",
    MASTER: "/company/master",
    ORDER: "/company/order",
    CERTIFICATE: "/company/certificate",
    STATISTICS: "/company/statistics",
    COMPANY: "/company/"
};

export const COMPANY_CABINET_ROUTES = [COMPANY_ROUTE.CREATE, COMPANY_ROUTE.CABINET, COMPANY_ROUTE.DATA, COMPANY_ROUTE.SERVICE, COMPANY_ROUTE.MASTER, COMPANY_ROUTE.ORDER, COMPANY_ROUTE.CERTIFICATE, COMPANY_ROUTE.STATISTICS];

export const DEFAULT_ROUTE = {
    HOME: "/"
};
