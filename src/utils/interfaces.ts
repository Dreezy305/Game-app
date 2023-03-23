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
