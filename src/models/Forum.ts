export type ForumComment = {
  id: string;
  postId: string;
  authorAlias: string;
  content: string;
  createdAt: string;
};

export type ForumPost = {
  id: string;
  authorAlias: string;
  title: string;
  content: string;
  createdAt: string;
  likedByMe: boolean;
  likesCount: number;
};
