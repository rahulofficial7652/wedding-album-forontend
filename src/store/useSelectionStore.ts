// store/useSelectionStore.ts
import { create } from 'zustand';

interface State {
  selected: Set<string>;
  comments: Record<string, string>;  // 🔥 NEW
  toggle: (id: string) => void;
  setComment: (id: string, comment: string) => void;
  isSelected: (id: string) => boolean;
}

export const useSelectionStore = create<State>((set, get) => ({
  selected: new Set(),
  comments: {},

  toggle: (id) =>
    set((state) => {
      const newSet = new Set(state.selected);
      if (newSet.has(id)) {
        newSet.delete(id);
        const newComments = { ...state.comments };
        delete newComments[id];
        return { selected: newSet, comments: newComments };
      }
      newSet.add(id);
      return { selected: newSet };
    }),

  setComment: (id, comment) =>
    set((state) => ({
      comments: { ...state.comments, [id]: comment },
    })),

  isSelected: (id) => get().selected.has(id),
}));