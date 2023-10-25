import { type ClassValue, clsx } from "clsx"
import { ICity, ICountry, IState } from "country-state-city";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type OnboardingType = {
  name: string;
  email: string;
  phoneNo: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  employmentStatus: string;
  howDidHear: string;
  ICountry: ICountry | null;
  IState: IState | null;
  ICity: ICity | null;
}
export type ObjectType = {
  [key: string]: string
}


export function callOnce(fn: () => void, delay: number) {
  let called = false;

  return function () {
    if (!called) {
      fn();
      called = true;

      setTimeout(() => {
        called = false;
      }, delay+1000);
    }
  };
}
export const emptyState: IState = {
  name: "None",
  isoCode: "",
  countryCode: "",
}
export const emptyCity: ICity = {
  name: "None",
  stateCode: "",
  countryCode: "",
}


export const selectClassNames = {
  container: () =>
    "bg-background border-2 border-secondary border-solid rounded-md text-primary",
  control: () => "pl-2",
  menuList: () =>
    "bg-background z-20 border-2 border-gray border-solid rounded-md",
  option: (state: any) =>
    cn(
      "bg-background p-1",
      state.isSelected && "!bg-foreground font-bold !text-black",
      state.isFocused && "bg-slate-400 font-bold !text-black"
    ),
  indicatorSeparator: () => "bg-slate-800 mr-2 my-2",
  dropdownIndicator: () => "text-slate-800 pr-2",
}