import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

interface IPlate {
  material: string;
  price?: string;
}

interface ICase {
  material: string;
  price?: string;
}

interface IKeyboardForm {
  // part 1
  angle: string;
  brand: string;
  colors: string[] | null;
  connection?: string;
  firmware?: string;
  mount: string;
  name: string;
  pcb?: string;
  size: string;
  layouts: string[] | null;
  layoutSupport: any[] | null;

  // part 2
  extraPcbs: boolean;
  extraPlates: boolean;
  switchSupport?: string[] | null;
  editions: string[] | null;
  cases: ICase[];
  plates: IPlate[];

  // part 3
  notes: string[];
  images: string[];
  errors?: boolean;
}

const defaultValues: IKeyboardForm = {
  angle: "",
  brand: "",
  cases: [{ material: "" }],
  colors: ["dffsdfsdf"],
  connection: "",
  editions: null,
  extraPcbs: false,
  extraPlates: false,
  firmware: "",
  images: [""],
  layouts: [""],
  layoutSupport: [{ value: "" }],
  mount: "",
  name: "",
  notes: [""],
  pcb: "",
  plates: [{ material: "" }],
  size: "",
  switchSupport: [""],
  errors: false,
};

const keyboardFormStore = atom({
  key: "keyboardFormStore",
  default: defaultValues,
});

const setString = selector({
  key: "setString",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      return { ...keyboardFormStore, [event.target.name]: event.target.value };
    });
  },
});

const changeStringInArray = selector({
  key: "changeStringInArray",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event, idx) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      const oldColors = { ...keyboardFormStore.colors };

      const newColors = [];

      Object.entries(oldColors).map((s) => {
        const yes = (s[event.target.tabIndex] = event.target.value);
        newColors.push(yes);
      });

      return {
        ...keyboardFormStore,
        colors: newColors,
      };
    });
  },
});

const setBoolean = selector({
  key: "setBoolean",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      return {
        ...keyboardFormStore,
        [event.target.name]: Boolean(event.target.value),
      };
    });
  },
});

const setObjArray = selector({
  key: "setObjArray",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      let idx = event.target.tabIndex;
      const pushObj = {
        [idx]: event.target.value,
      };
      const newArr = [];
      const pushToArr = newArr.push(pushObj);
      return {
        ...keyboardFormStore,
        [event.target.name]: pushToArr,
      };
    });
  },
});

const setObjValue = selector({
  key: "setObjValue",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      console.log("event.target.value", event.target.value);
      return {
        ...keyboardFormStore,
        // [event.target.name]: pushToArr,
      };
    });
  },
});

const pushObjToArray = selector({
  key: "setObjArray",
  get: ({ get }) => get(keyboardFormStore),
  set: ({ set }, event) => {
    set(keyboardFormStore, (keyboardFormStore) => {
      const where = event.target.name;
      const newArr = [...keyboardFormStore.layoutSupport, { value: "test" }];
      return {
        ...keyboardFormStore,
        [event.target.name]: newArr,
      };
    });
  },
});

export const useKeyboardForm = () => ({
  values: useRecoilValue(keyboardFormStore),
  setString: useSetRecoilState(setString),
  changeStringInArray: useSetRecoilState(changeStringInArray),
  setBoolean: useSetRecoilState(setBoolean),
  setObjArray: useSetRecoilState(setObjArray),
  setObjValue: useSetRecoilState(setObjValue),
  pushObjToArray: useSetRecoilState(pushObjToArray),
});
