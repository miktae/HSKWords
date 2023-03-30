import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
    persist(
        (set, get) => ({
            wArray: [],
            n: 0,
            increaseN: () => set({ n: get().n + 1 }),
            upIndex: () => set({ index: get().index + 1 }),
            removeN: () => set({ n: 0 }),
            pushToArray: (r) => {
                if (r && r[0]) {
                    set((state) => ({ wArray: [...state.wArray, r[0], r[1], r[2], r[3], r[4]] }))
                     //   console.log(get());
                    // console.log(r);
                    // console.log(r[0]);
                }
            },
        }),
        {
            name: 'n-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
)

export const useBearsStore = create(
    persist(
        (set, get) => ({
            tScore: 0,
            updateScore: () => set({ tScore: get().tScore + 1 }),
        }),
        {
            name: 'n-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)