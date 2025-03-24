const dateRanges = [
  { label: "Today", startDate: new Date(), endDate: new Date() },
  {
    label: "Yesterday",
    startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    label: "Last 7 Days",
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  },
  {
    label: "Last 30 Days",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  },
  {
    label: "This Month",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  },
  {
    label: "Last Month",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  },
  {
    label: "Custom",
    startDate: null, // User selects manually
    endDate: null, // User selects manually
  },
];
