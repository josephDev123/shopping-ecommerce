import { ReactNode } from "react";

// Define the data type
interface TableDataType {
  id: number;
  name: string;
  age: number;
  email: string;
  country: string;
}

// Define columns with correct typing
export const columns: { key: keyof TableDataType; label: ReactNode }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
  { key: "country", label: "Country" },
];

// Define data
export const TableData: TableDataType[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com", country: "USA" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com", country: "Canada" },
  {
    id: 3,
    name: "Charlie",
    age: 28,
    email: "charlie@example.com",
    country: "UK",
  },
  {
    id: 4,
    name: "David",
    age: 35,
    email: "david@example.com",
    country: "Germany",
  },
  {
    id: 5,
    name: "Emma",
    age: 22,
    email: "emma@example.com",
    country: "France",
  },
];
