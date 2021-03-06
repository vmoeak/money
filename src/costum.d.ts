type RecordItem = {
  tag: { name: string; id: string };
  notes: string;
  type: string;
  amount: number;
  time?: dayjs;
};

type Tag = {
  name: string;
  id: string;
};
