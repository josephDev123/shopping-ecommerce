export type INotification = {
  _id: string; // Optional unique identifier
  type: string;
  label: string; // Optional short display label or title
  from: string; // sender user ID or system identifier
  to: string; // recipient user ID
  read?: boolean;
  link?: string;
  metadata?: Record<string, any>; // Dynamic key-value data
};
