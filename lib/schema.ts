import { z } from "zod"

export const formSchemaName = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
export const formSchemaEmail = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
})
export const formSchemaPhoneNo = z.object({
  phoneNo: z.string().min(10, {
    message: "PhoneNo must be at least 10 characters.",
  }).max(10, {
    message: "PhoneNo must be at most 10 characters.",
  }),
})
export const formSchemaDob = z.object({
  dob: z
    .string()
    .min(1, {
      message: "Please enter your date of birth",
    })
    .refine(
      (dob) => {
        if (!dob) return false
        console.log(dob)
        const res = new Date(dob)
        const date = new Date()
        date.setFullYear(date.getFullYear() - 10)
        return !(res > date)
      },
      { message: "You must be atleast 10 years old" }
    )
    .refine(
      (dob) => {
        if (!dob) return false
        const res = new Date(dob)
        const date = new Date()
        date.setFullYear(date.getFullYear() - 110)
        return !(res < date)
      },
      { message: "You must be less than 110 years old" }
    ),
})
export const formSchemaGender = z.object({
  gender: z.string().min(1, { message: "gender can't be empty" }),
})
export const formSchemaCountry = z.object({
  country: z.string().min(1, { message: "country can't be empty" }),
})
export const formSchemaState = z.object({
  state: z.string().min(1, { message: "state can't be empty" }),
})
export const formSchemaCity = z.object({
  city: z.string().min(1, { message: "city can't be empty" }),
})
export const formSchemaEmploymentStatus = z.object({
  employmentStatus: z.string().min(1, { message: "Please select a option" }),
})
export const formSchemaHowDidHear = z.object({
  howDidHear: z.string().min(1, { message: "Please select a option" }),
})

