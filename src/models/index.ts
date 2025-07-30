export enum UserStatus {
  PENDING_VALIDATION = 1,
  ACTIVE = 2,
  INATIVE = 3,
}

type BaseEntityType = {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date;
}

export type User = {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date;
  email: string;
  name: string;
  status: UserStatus;
  categories?: Category[];
  itemsGroups?: ItemsGroup[];
}

export type ItemsGroup = BaseEntityType & {
  id: number;
  name: string;
  userId: number;
  items?: Item[];
  user?: User;
}

export type Item = BaseEntityType & {
  name: string;
  isChecked: boolean;
  itemsGroupId: number;
  itemsGroup?: ItemsGroup;
}

export type Category = BaseEntityType & {
  name?: string;
  user?: User;
}

export interface LoginAcessTokens {
  accessToken: string,
  refreshToken: string,
}

export type LoginCredentials = {
  email: string;
  password: string;
}

export enum PagesRoutes {
  LOGIN = '/login',
  CREATE_ACCOUNT = '/create-account',
  RECOVERY_PASSWORD = '/recovery-password',
  NEW_PASSWORD = '/new-password',
  VALIDATE_EMAIL = '/validate-email',
  ROOT = '/',
  PROFILE = '/profile',
  ITEMS_GROUPS = '/items-groups',
}