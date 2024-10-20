export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  listId: number;
}

export interface List {
  id: number;
  name: string;
}
