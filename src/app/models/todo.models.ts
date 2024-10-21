export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
}

export interface List {
  id: string;
  name: string;
}
