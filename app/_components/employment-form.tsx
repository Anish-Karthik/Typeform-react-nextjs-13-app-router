"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useForm } from "react-hook-form"
import Select from "react-select"
import * as z from "zod"

import { jobRolesObj } from "@/lib/job-role"
import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import { OnboardingType, callOnce, selectClassNames } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Question } from "./question"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Country, City and State form',
}

export default function EmploymentForm({
  updateFields,
  getHooks,
  form,
  formSchema,
  data,
}: {
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  data: OnboardingType
}) {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo, getFirstInvalidStep, setValidIndex, validCountArr, prev }  = getHooks()
  useHandleScroll(scrollDown, back)
  const now = currentStepIndex;
  const [isGoingBack, setIsGoingBack] = useState(false)
  const [prevValue, setPrevValue] = useState<number>(prev)
  const [selectedData, setSelectedData] = useState<{name: string} | null>({name: data.employmentStatus});
  const { isSubmitting, isValid } = form.formState
  useEffect(() => {
    form.setValue("employmentStatus", selectedData?.name || "")
  }, [form, selectedData, setSelectedData])

  function scrollDown() {
    form.handleSubmit(onSubmit)()
  }

  function scrollUp() {
    if(isFirstStep || now == 0) return
    setPrevValue(() => now+1)
    setIsGoingBack(() => true)
  }
  
  // handle next
  async function onSubmit(values: z.infer<typeof formSchema>) {

    updateFields({...values})
    console.log("isLastStep", values)
    if(!isLastStep) {
      console.log("next step", getFirstInvalidStep())
      if(getFirstInvalidStep() !== steps.length && getFirstInvalidStep() !== currentStepIndex) goTo(getFirstInvalidStep())
      else 
      next()
    }else {
      console.log("form submitted")
      alert("form submitted")
    }
    console.log(values)
  }
  useEffect(() => {
    if (isValid) {
      setValidIndex(currentStepIndex)
    } else {
      setValidIndex(currentStepIndex, 0)
    }
  }, [isValid])
  
  // handle back
  useEffect(() => {
    if(isGoingBack) {
      setIsGoingBack(false)
      callOnce(() => setTimeout(back, 200), 1000)()
    }
  }, [back, isGoingBack, prevValue])

  return (
      <Question
        outView={false}
        outViewSlide={prevValue < now ? "up" : "down"}
        inView={true}
        inViewSlide={prev == -1? "": prev < now ? "up" : "down"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize form_heading">{"Employment Status"}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {(!selectedData || selectedData.name === "") && <div className="absolute inset-0 top-2 left-2 ">
                        Select your status
                      </div>}
                      <Select
                        unstyled
                        classNames={selectClassNames}
                        className="bg-transparent"
                        options={jobRolesObj}
                        getOptionLabel={(options) => {
                          return options["name"]
                        }}
                        getOptionValue={(options) => {
                          return options["name"]
                        }}
                        placeholder="Select your EmploymentStatus"
                        value={selectedData}
                        defaultValue={{name:"Select your EmploymentStatus"}}
                        onChange={(item) => {
                          setSelectedData(item)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Select your EmploymentStatus.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isFirstStep && <Button onClick={scrollUp} type="button">Back</Button>}
            {isLastStep && <Button type="submit">Submit</Button>}
            {!isLastStep && <Button type="submit">Next</Button>}
          </form>
        </Form>
      </Question>
    
  )
}