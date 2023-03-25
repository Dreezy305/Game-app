export interface menuItem {
  title: string;
  to: string;
  icon: string;
  selected: string;
  setSelected: any;
}

export type contextProps = {
  children: React.ReactNode;
};

export type itemProps = {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: any;
};

export type HeaderProps = {
  title: string;
  subtitle: string;
};

export interface userInterface {
  address?: string;
  avatar?: string;
  createdAt?: string;
  email?: string;
  id?: string;
  name?: string;
  phoneNumber?: string;
  uniqueId?: string;
}

export interface paginationInterface {
  page: number;
  pageSize: number;
}

export type DialogProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  userName?: string;
  handleDelete?: () => void;
  loading: boolean;
  userObj?: any;
  refetch?: any;
};

export interface userEditPayload {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface userFilterInterface {
  label: string;
  value: string;
}

export interface addUserPayload {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  gender: string;
}
