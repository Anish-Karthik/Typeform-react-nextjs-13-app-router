import { type ClassValue, clsx } from "clsx"
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
  country: string
  state: string;
  city: string;
  employmentStatus: string;
  howDidHear: string;
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