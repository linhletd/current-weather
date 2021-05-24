import URLProvider from '../URLProvider';

const URLs = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  NOT_FOUND: '/notFound',
  BUGGY: '/buggy',

  ACCOUNT_DEVICE_LOG: '/contact/:id/product/show-log-device',

  AUTO_CALL_CREATE: '/auto-call/create',
  AUTO_CALL_EDIT: '/auto-call/edit/:id',
  AUTO_CALL_LIST: '/auto-call/all',

  CAMPAIGN_CREATE: '/campaign/create',
  CAMPAIGN_EDIT: '/campaign/edit/:id',
  CAMPAIGN_LIST: '/campaign/all',

  CALL_LIST: '/call/all',

  CONFIG_CREATE: '/config/create',
  CONFIG_EDIT: '/config/edit/:id',
  CONFIG_LIST: '/config/all',
  CONFIG_CAMPAIGN_GROUP_EDIT: '/campaign_group/edit/:id',
  CONFIG_CAMPAIGN_TYPE_EDIT: '/campaign_type/edit/:id',
  CONFIG_CUSTOMER_EMOTION_EDIT: '/customer_emotion/edit/:id',
  CONFIG_IVR_EDIT: '/ivr/edit/:id',
  CONFIG_PACKAGE_DURATION_EDIT: '/package_duration/edit/:id',
  CONFIG_PROGRAM_EDIT: '/program/edit/:id',
  CONFIG_PRODUCT_EDIT: '/product/edit/:id',
  CONFIG_SALE_TYPE_EDIT: '/sale_type/edit/:id',
  CONFIG_SOURCE_TYPE_EDIT: '/source_type/edit/:id',
  CONFIG_SHIPMENT_GIFT_EDIT: '/shipment_gift/edit/:id',
  CONFIG_UTM_MEDIUM_EDIT: '/utm_medium/edit/:id',
  CONFIG_UTM_SOURCE_EDIT: '/utm_source/edit/:id',
  CONFIG_UTM_TEAM_EDIT: '/utm_team/edit/:id',

  CONTACT_CREATE: '/contact/create',
  CONTACT_EDIT: '/contact/edit/:id',
  CONTACT_LIST: '/contact/all',
  CONTACT_ALL: '/contact',

  DEAL_CREATE: '/deal/create',
  DEAL_EDIT: '/deal/edit/:id',
  DEAL_LIST: '/deal/all',
  DEAL_ALL: '/deal',
  DEAL_TO_SHIPMENT: '/deal/deal-to-shipment/create/:id',

  DEPARTMENT_CREATE: '/department/create/:id',
  DEPARTMENT_ADD_USER: '/department/add-user/:id',
  DEPARTMENT_EDIT: '/department/edit/:id',
  DEPARTMENT_USER_EDIT: '/department/user/edit/:id',
  DEPARTMENT_LIST: '/department/all',
  DEPARTMENT_MANAGE: '/department/manage',

  DISTRICT_CREATE: '/district/create',
  DISTRICT_EDIT: '/district/edit/:id',
  DISTRICT_LIST: '/district/all',

  PACKAGE_CREATE: '/package/create/:id',
  PACKAGE_EDIT: '/package/edit/:id',
  PACKAGE_LIST: '/package/all',
  PACKAGE_DETAIL: '/package/detail/:id',

  PERMISSION_CREATE: '/permission/create',
  PERMISSION_EDIT: '/permission/edit/:id',
  PERMISSION_LIST: '/permission/all',

  PROVINCE_CREATE: '/province/create',
  PROVINCE_EDIT: '/province/edit/:id',
  PROVINCE_LIST: '/province/all',

  PIPELINE_CREATE: '/pipeline/create',
  PIPELINE_EDIT: '/pipeline/edit/:id',
  PIPELINE_LIST: '/pipeline/all',
  PIPELINE_STAGE_EDIT: '/pipeline/update-stage/:id',
  PIPELINE_REPORT: '/report-express-daily',

  ROLE_CREATE: '/role/create',
  ROLE_EDIT: '/role/edit/:id',
  ROLE_LIST: '/role/all',
  ROLE_PERMISSION_EDIT: '/role/update-permission/:id',

  SHIPMENT_EDIT: '/shipment/edit/:id',
  SHIPMENT_LIST: '/shipment/all',
  SHIPMENT_CONFIG_EDIT: '/shipment-config/edit/:id',
  SHIPMENT_CONFIG_LIST: '/shipment-config/all',
  SHIPMENT_CONFIG_CREATE: '/shipment-config/create',
  SHIPMENT_ALL: '/shipment',

  STAGE_LIST: '/stage/all',
  STAGE_CREATE: '/stage/create',
  STAGE_EDIT: '/stage/edit/:id',

  SMS_LIST: '/sms/all',
  SMS_SEND: '/sms/send',
  SMS_HISTORY: '/sms/history',
  SMS_UPLOAD_EXCEL: '/sms/upload-excel',

  REPORT_AUTO_CALL: '/report-auto-call',

  TICKET_CREATE: '/ticket/create',
  TICKET_EDIT: '/ticket/edit/:id',
  TICKET_LIST: '/ticket/all',

  TICKET_TYPE_CREATE: '/type-ticket/create',
  TICKET_TYPE_EDIT: '/type-ticket/edit/:id',
  TICKET_TYPE_LIST: '/type-ticket/all',

  USER_CREATE: '/user/create',
  USER_EDIT: '/user/edit/:id',
  USER_LIST: '/user/all',
  USER_ROLE_EDIT: '/user/update-role/:id',
  USER_PERMISSION_EDIT: '/user/update-permission/:id',
  VOUCHER_LIST: '/voucher/all',
  VOUCHER_CREATE: '/voucher/create',
  VOUCHER_EDIT: '/voucher/edit/:id',
  VOUCHER_REPORT: '/voucher/report/:id',
  SALE_REPORT: '/sale-detail/report',
  USER_PROFILE: '/user/profile',
  ANY: '/*',

  CHECK_CODE_ACTIVE: '/check-code-active',
};

export default {
  getUrl(key, replaceOptions) {
    return URLProvider.getUrl(URLs, key, replaceOptions);
  },
};
