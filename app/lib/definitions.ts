export type FilteredEmployeesTable = {
  id: string;
  name: string;
  email: string;
  manager_id: string;
  image_url: string;
};

export type ValueId = 'serving' | 'nerdy' | 'excellence' | 'people' | 'grow';

export type RecognitionsTable = {
  id: string;
  receiverId: string;
  senderId: string;
  valueId: ValueId;
  comment: string;
  date: string;
};

export type FormattedRecognitionsTable = {
  id: string;
  receiver_id: string;
  sender_id: string;
  sender_name: string;
  sender_image_url: string;
  value_id: ValueId;
  comment: string;
  date: string;
};

export const values: { id: ValueId; name: string }[] = [
  { id: 'serving', name: 'Lead by Serving' },
  { id: 'nerdy', name: 'Stay Nerdy' },
  { id: 'excellence', name: 'Produce Excellence' },
  { id: 'people', name: 'Value People' },
  { id: 'grow', name: 'Grow & Get Better' },
];
