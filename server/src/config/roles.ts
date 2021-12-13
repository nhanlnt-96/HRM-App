export const roles = ['user', 'manager', 'admin'];

export const roleRights = new Map();

roleRights
  .set(roles[0], [])
  .set(roles[1], ['getUser', 'getUsers'])
  .set(roles[2], ['getUser', 'getUsers', 'updateUser']);
