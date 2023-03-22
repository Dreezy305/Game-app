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
