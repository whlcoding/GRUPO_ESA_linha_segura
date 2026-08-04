import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SEED_FORUM_COMMENTS, SEED_FORUM_POSTS } from '@/constants/seedData';
import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { ForumComment, ForumPost } from '@/models/Forum';

type ForumState = {
  posts: ForumPost[];
  comments: ForumComment[];

  addPost: (title: string, content: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleLike: (postId: string) => void;
  clearHistory: () => void;
};

export const useForumStore = create<ForumState>()(
  persist(
    (set) => ({
      posts: SEED_FORUM_POSTS,
      comments: SEED_FORUM_COMMENTS,

      addPost: (title, content) => {
        const post: ForumPost = {
          id: generateId(),
          authorAlias: 'Você',
          title,
          content,
          createdAt: nowIso(),
          likedByMe: false,
          likesCount: 0,
        };
        set((state) => ({ posts: [post, ...state.posts] }));
      },

      addComment: (postId, content) => {
        const comment: ForumComment = {
          id: generateId(),
          postId,
          authorAlias: 'Você',
          content,
          createdAt: nowIso(),
        };
        set((state) => ({ comments: [...state.comments, comment] }));
      },

      toggleLike: (postId) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likedByMe: !post.likedByMe,
                  likesCount: post.likesCount + (post.likedByMe ? -1 : 1),
                }
              : post
          ),
        }));
      },

      clearHistory: () => set({ posts: SEED_FORUM_POSTS, comments: SEED_FORUM_COMMENTS }),
    }),
    {
      name: 'safeline.forum',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
