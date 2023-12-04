import { v4 as uuidv4 } from "uuid";

export const optionsOrder = [
  {
    id: uuidv4(),
    label: "The newest",
    actions: {
      sortBy: "created",
      sortDirection: "desc",
    },
    active: true,
  },
  {
    id: uuidv4(),
    label: "The most expensive",
    actions: {
      sortBy: "price",
      sortDirection: "desc",
    },
    active: false,
  },
  {
    id: uuidv4(),
    label: "The most cheapest",
    actions: {
      sortBy: "price",
      sortDirection: "asc",
    },
    active: false,
  },
];
export const optionsFilter = [
  {
    id: uuidv4(),
    name: "apple",
    label: "Apple",
    value: ["iphone", "airpods", "macbook"],
    checked: false,
  },
  {
    id: uuidv4(),
    name: "samsung",
    label: "Samsung",
    value: ["samsung"],
    checked: false,
  },
  {
    id: uuidv4(),
    name: "xiaomi",
    label: "Xiaomi",
    value: ["xiaomi"],
    checked: false,
  },
  {
    id: uuidv4(),
    name: "honor",
    label: "Honor",
    value: ["honor"],
    checked: false,
  },
  {
    id: uuidv4(),
    name: "nokia",
    label: "Nokia",
    value: ["Nokia"],
    checked: false,
  },
  {
    id: uuidv4(),
    name: "redmi",
    label: "Redmi",
    value: ["Redmi"],
    checked: false,
  },
];

