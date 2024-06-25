export type FilteredEmployeesTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type RecognitionsTable = {
  id: string;
  receiverId: string;
  valueId: 'serving' | 'nerdy' | 'excellence' | 'people' | 'grow';
  comment: string;
  date: string;
};
