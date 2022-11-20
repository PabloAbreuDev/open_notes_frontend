export interface ICardInfo {
  _id: string;
  title: string;
  content: string;
  tags: ITagInfo[];
  color?: string;
}

export interface ITagInfo {
  _id: string;
  name: string;
}

export interface INotebook {
  _id: string;
  title: string;
  pages: ICardInfo[];
}
