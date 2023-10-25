"use client"
import styles from '@/lib/styles.module.css'
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
import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import { ObjectType, OnboardingType, callOnce, cn } from "@/lib/utils"

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DropdownSelect } from "./dropdown-select/DropdownSelect"
import { DropdownSelectOption } from './dropdown-select-option/DropdownSelectOption'
import classNames from 'classnames'
import { Question } from './question'

const SelectForm = ({
  updateFields,
  getHooks,
  form,
  formSchema,
  data,
  name,
  options,
}: {
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  data: OnboardingType
  name: "gender" | "howDidHear"
  options: ObjectType
}) => {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo, getFirstInvalidStep, setValidIndex, validCountArr, prev }  = getHooks()
  useHandleScroll(scrollDown, back)
  const now = currentStepIndex;
  const [isGoingBack, setIsGoingBack] = useState(false)
  const [isGoingNext, setIsGoingNext] = useState(false)
  const [prevValue, setPrevValue] = useState<number>(prev)
  const [selectedData, setSelectedData] = useState<string>(data[name]);
  const { isSubmitting, isValid } = form.formState
  useEffect(() => {
    form.setValue(name, selectedData || "")
  }, [form, selectedData, setSelectedData])

  function scrollDown() {
    form.handleSubmit(onSubmit)()
  }

  function scrollUp() {
    if(isFirstStep || now == 0) return
    setPrevValue(() => now+1)
    setIsGoingBack(() => true)
  }
  function handleDropdownOptionClick(val: string) {
    setSelectedData(val)
    setIsGoingNext(true)
  }
  
  // handle next
  async function onSubmit(values: z.infer<typeof formSchema>) {

    updateFields({...values})
    if(!isLastStep) {
      console.log("next step", getFirstInvalidStep())
      if(getFirstInvalidStep() !== steps.length && getFirstInvalidStep() !== currentStepIndex) goTo(getFirstInvalidStep())
      else 
      next()
    }else {
      setValidIndex(currentStepIndex)
      console.log("form submitted")
      // alert("form submitted")
    }
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

  useEffect(() => {
    if(isGoingNext) {
        setIsGoingNext(false)  
      callOnce(() => setTimeout(scrollDown, 500), 1000)()
    }
  }, [isGoingNext, prevValue])
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
            name={name}
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className="capitalize form_heading">{name}</FormLabel>
                <FormControl className='text-4xl'>
                  <DropdownSelect className={styles["role-dropdown"]}>
                    <div className='w-full'>
                      {Object.keys(options).map((optionKey) => {
                        const _role = options[optionKey]

                        return (
                          <DropdownSelectOption
                            key={optionKey}
                            className={cn(styles["role-option"], "!bg-slate-400 ")}
                            onClick={() => handleDropdownOptionClick(_role)}
                            isSelected={_role === selectedData}
                          >
                            <span
                              className={classNames({
                                [styles["selected"]]: _role === selectedData,
                              })}
                            >
                              {optionKey}
                            </span>
                            {_role}
                          </DropdownSelectOption>
                        )
                      })}
                    </div>
                  </DropdownSelect>
                </FormControl>
                <FormDescription>
                  This is your public display {name}.
                </FormDescription>
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

export default SelectForm