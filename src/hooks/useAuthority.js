import { getPermission } from '../util/TokenProvider';

export function useHasAccess(allowedAuthorities, authorityKey) {
  let checkPermission = getPermission().some((permission) => allowedAuthorities.includes(permission.code));
  if (authorityKey === 'permissions') {
    return checkPermission;
  }
  return false;
}

export function useHasPendableAccess(allowedAuthorities, authorityKey) {
  let checkPermission = getPermission().some((permission) => allowedAuthorities.includes(permission.code));
  if (authorityKey === 'permissions') {
    return checkPermission;
  }
  return false;
}
