import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfo = atom({
  key: "userInfo",
  default: { uid: "", photoUrl: "", displayName: "" },
  effects_UNSTABLE: [persistAtom],
});