import URLProvider from '../../URLProvider';

export const URLs = {
  GET_USER_LOGGED: '/v1/user/logged',
  LOGIN: '/login/username-json',

  ACCOUNT_ACTIVATE: '/product/activate',
  ACCOUNT_DEACTIVATE: '/product/deactivate',
  ACCOUNT_CHANGE_NAME: '/product/rename-account',
  ACCOUNT_RESET_PASSWORD: '/product/reset-password',
  ACCOUNT_CHANGE_TIME_LEARN: '/product/change-time-learn',
  ACCOUNT_REFRESH: '/product/refesh-account', //?username
  ACCOUNT_SHOW_LOG_DEVICE: '/product/show-log-device',
  ACCOUNT_DELETE_LOG_LEARN: '/product/delete-log-learn',

  AUTO_CALL_APPROVE: '/auto-call/approve',
  AUTO_CALL_ITEM: '/auto-call',
  AUTO_CALL_FILTER: 'auto-call/filter',
  AUTO_CALL_LIST: '/auto-call/search',
  AUTO_CALL_CREATE_EXCEL: '/auto-call/create-excel',
  AUTO_CALL_REPORT: '/public/auto-call/report',
  AUTOCALL_DOWNLOAD: '/public/auto-call/export-excel',

  CALL_LIST: '/common/call',
  CALL_OF_CONTACT: '/common/call-of-contact',
  CALL_OF_DEAL: '/common/call-of-deal',
  CALL_OF_SALE: '/common/call-of-sale',

  CAMPAIGN_ITEM: '/campaign',
  CAMPAIGN_LIST_ALL: '/campaign/all',
  CAMPAIGN_LIST: '/campaign/search',
  CAMPAIGN_BY_GROUP: '/campaign/find-by-group',
  CAMPAIGN_LIST_ACTIVE: '/campaign/find-active',
  CAMPAIGN_BY_CURRENT_USER: '/campaign/find-active-by-current-user-department',

  CHECK_CODE_ACTIVE: '/public/check-active-code',

  COMMENT_CREATE: '/common/comment',
  COMMENT_CREATE_JSON: '/common/comment-json',
  COMMENT_LIST: '/common/comment',

  CONFIG_ITEM: '/config',
  CONFIG_LIST: '/config/search',
  CONFIG_TYPE: '/config/type',

  CONFIG_DATA_LIST: '/config-data/search',
  CONFIG_DATA: '/config-data',
  CONFIG_LIST_CAMPAIGN: '/config-data/find-campaign/:id',
  CONFIG_UPDATE_CAMPAIGN: '/config-data/update-campaign',

  CONTACT_ITEM: '/contact',
  CONTACT_CHILD_ITEM: '/contact-child',
  CONTACT_FILTER: '/contact/filter',
  CONTACT_IMPORT_FILE: '/contact/import-excel',
  CONTACT_LIST: '/contact/search',
  CONTACT_EXPORT_FILE: '/contact/filter/export-excel',
  CONTACT_DOWNLOAD_FILE: '/contact/filter/download',
  CONTACT_LIST_CHILD: '/contact-child/contact',
  CONTACT_LIST_ACCOUNT: '/contact-account/contact',
  CONTACT_LIST_ACTIVITY: '/common/activity',
  CONTACT_LIST_LEARN_HISTORY: '/public/logs-learn',

  COMMON_CONTACT_CALL: '/common/call',

  DASHBOARD: '/dashboard',

  DEAL_ASSIGN: '/deal/assign',
  DEAL_ASSIGN_ALL: '/deal/assign-all',
  DEAL_CLOSE: '/deal/close',
  DEAL_ITEM: '/deal',
  DEAL_LIST: '/deal/search',
  DEAL_LIST_BY_CONTACT: '/deal/contact',
  DEAL_FILTER: '/deal/filter',
  DEAL_STATUS: '/deal/status',
  DEAL_LIST_STAGE_DEFAULT: '/stage/find-default-stages',
  DEAL_LIST_STAGE: '/deal-stage/search',
  DEAL_CREATE_TRIAL: '/deal/create-trial-account',
  DEAL_AUTO_ASSIGN: '/deal/receive',
  DEAL_EXPORT_FILE: '/deal/filter/export-excel',
  DEAL_IMPORT_FILE: '/deal/import-deal',
  DEAL_CREATE_ALT: '/deal/create-deal',
  DEAL_STAGE_UPDATE: '/deal/update-stage',
  DEAL_IMPORT_ASSIGN: '/deal/import-assign',
  DEAL_LIST_ACCOUNT: '/contact-account/find-accounts-by-deal',
  DEAL_MOVE_TO_OFFLINE: '/deal/move-to-offline-channel',
  DEAL_IMPORT_GSHEET: '/deal/import-deal',

  DEPARTMENT_ADD_USER: '/department/update-user',
  DEPARTMENT_FIND_BY_TYPE: '/department/find-by-type',
  DEPARTMENT_REMOVE_USER: '/department/remove-user',
  DEPARTMENT_ALL: '/department/all',
  DEPARTMENT_BY_PARENT: '/department/find-by-parent',
  DEPARTMENT_ITEM: '/department',
  DEPARTMENT_LIST: '/department/search',
  DEPARTMENT_SET_MANAGER: '/department/set-manager',
  DEPARTMENT_REMOVE_MANAGER: '/department/remove-manager',
  DEPARTMENT_USER_LIST: '/department/find-users',
  DEPARTMENT_TYPE_LIST_USER: '/department/find-users-by-department-type',

  DISTRICT_ITEM: '/district',
  DISTRICT_LIST: '/district/search',

  JOB_STATUS: '/job/status',

  PACKAGE_ITEM: '/package',
  PACKAGE_LIST: '/package/search',
  PACKAGE_FILTER: '/package/filter',
  PACKAGE_CHILD_LIST: '/package/find-child',
  PACKAGE_BY_PRODUCT: 'package/find-by-product',
  PACKAGE_UPDATE_CHILD: '/package/update-child',
  PACKAGE_BY_PARENT: '/package/find-child-by-parent',
  // PACKAGE_BY_PARENT: '/package/find-child',

  PERMISSION_ITEM: '/permission',
  PERMISSION_LIST: '/permission/search',

  PIPELINE_FIND_STAGE: '/pipeline/find-stage',
  PIPELINE_ITEM: '/pipeline',
  PIPELINE_LIST: '/pipeline/search',
  PIPELINE_LIST_BY_STAGE: '/stage/list-pipeline',
  PIPELINE_UPDATE_STAGE: '/pipeline/update-stage',

  PROVINCE_ITEM: '/province',
  PROVINCE_LIST: '/province/search',
  PROVINCE_LIST_ALL: '/province/find-provinces',
  PROVINCE_LIST_DISTRICT: '/province/find-districts',

  ROLE_ITEM: '/role',
  ROLE_LIST: '/role/search',
  ROLE_FIND_PERMISSION: '/role/find-permissions',
  ROLE_UPDATE_PERMISSION: '/role/update-permission',

  SHIPMENT_ITEM: '/shipment',
  SHIPMENT_LIST: '/shipment/search',
  SHIPMENT_FILTER: '/shipment/filter',
  SHIPMENT_FROM_DEAL: '/deal/create-shipment',
  SHIPMENT_UPDATE: '/shipment/update-json',

  SHIPMENT_CREATE_PDF: '/shipment/create-pdf',
  SHIPMENT_CONFIG_LIST: '/config-shipment/search',
  SHIPMENT_CONFIG_ITEM: '/config-shipment',
  SHIPMENT_LIST_BY_CONTACT: '/shipment/contact',
  SHIPMENT_EXPORT_FILE: '/shipment/export-excel',
  SHIPMENT_IMPORT_NOTE: '/shipment/import-note',
  SHIPMENT_PACK_TO_SHIP: '/shipment/packaging-shipments',
  SHIPMENT_LIST_BY_DEAL: '/shipment/find-by-deal',
  SHIPMENT_ASSIGN: '/shipment/assign-shipment',

  SMS_SEND: '/log-sms-bulk',
  SMS_LIST: '/log-sms-bulk/search',
  SMS_FILTER: '/log-sms/filter',
  SMS_HISTORY_LIST: '/log-sms/search',
  SMS_CREATE_EXCEL: '/log-sms-bulk/create-excel',
  SMS_OF_CONTACT: '/log-sms/filter-without-time',

  STAGE_ITEM: '/stage',
  STAGE_LIST: '/stage/search',

  TICKET_ITEM: '/ticket',
  TICKET_ITEM_JSON: '/ticket/create-json',
  TICKET_LIST: '/ticket/search',
  TICKET_FILTER: '/ticket/filter',
  TICKET_LIST_BY_CONTACT: '/ticket/contact',

  TICKET_TYPE_BY_PARENT: '/ticket-type/find-by-parent',
  TICKET_TYPE_BY_ROOT: '/ticket-type/find-by-root',
  TICKET_TYPE_ITEM: '/ticket-type',
  TICKET_TYPE_LIST: '/ticket-type/search',
  TICKET_CREATE_BY_SALE: 'ticket/create-ticket-by-sale',

  //user profile
  USER_CHANGE_PASSWORD: '/user/change-password',
  USER_PROFILE: '/user/profile',
  USER_QUOTA: '/user/quota',

  USER_DEACTIVE: '/user/deactive',
  USER_ITEM: '/user',
  USER_LIST: '/user/search',
  USER_FILTER: '/user/filter',
  USER_FIND_DEPARTMENT: '/user/find-departments',
  USER_FIND_BY_USERNAME: '/user/find-id-by-username',
  USER_FIND_PERMISSION: '/user/find-permissions',
  USER_FIND_ROLE: '/user/find-role',
  USER_UPDATE_PERMISSION: '/user/update-permission',
  USER_UPDATE_ROLE: '/user/update-role',
  USER_UPLOAD_QUOTA: '/user/update-quota',
  USER_EVICT_SIP_ACCOUNT: '/user/reset-sip-account',

  VOUCHER_ITEM: '/public/voucher',
  VOUCHER_LIST: '/public/voucher/search',
  VOUCHER_CODE_ACTIVE: '/public/voucher/count-active',
  VOUCHER_CODE_DOWNLOAD: '/public/voucher/export-active',

  REPORT_SALE_DETAIL_LIST: '/report/sale-detail',

  REFRESH_TOKEN: '/refresh/token',

  UPLOAD: '/upload',
};

export default {
  getUrl(key, replaceOptions) {
    return URLProvider.getUrl(URLs, key, replaceOptions);
  },
};

export const QUERY_KEYS = {};
Object.keys(URLs).map((key) => {
  Object.defineProperty(QUERY_KEYS, key, {
    value: key,
    writable: false,
    enumerable: true,
    configurable: true,
  });
});
