const all_statuses = [ // order to list them
  'Pending',
  'Preparing',
  'Ready',
  'Done',
  'Error',
];

// ==============================================

const int2status = (int) => {
  // int: number
  // return: string

  const indexed_statuses = ['Error', 'Pending', 'Preparing', 'Ready', 'Done']; // order to index them
  return indexed_statuses[int];
};

// ==============================================

const status2int = (status) => {
  // int: number
  // return: string

  const statuses_obj = {
    'Error': 0, 
    'Pending': 1, 
    'Preparing': 2, 
    'Ready': 3, 
    'Done': 4,
  }; // order to index them
  return statuses_obj[status];
};
// ==============================================

const ints2statuses = (ints) => {
  // ints: number[]
  // return: string[]

  return ints.map(int => int2status(int));
};

// ==============================================

const statuses2ints = (statuses) => {
  // statuses: string[]
  // return: number[]

  return statuses.map(status => status2int(status));
};

// ==============================================

const statusInt2Color = (int) => {
  const statuses = ['error', 'secondary', 'warning', 'info', 'success', 'primary',  ];
  return statuses[int];
};

// ==============================================

export { 
  all_statuses,
  int2status, ints2statuses,
  status2int, statuses2ints,
  statusInt2Color,
};