"use client";

import { Progress } from "@/components/ui/progress";
import { multiStepHooksType, useMultistepForm } from "@/lib/useMultiStepForm";
import { OnboardingType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GenericForm from "./generic-form";
import { formSchemaDob, formSchemaEmail, formSchemaGender, formSchemaName, formSchemaPhoneNo } from "@/lib/schema";


const total = 9;
const TypeForm = ({
  initialData,
}: {
  initialData: OnboardingType
}) => {
  const [data, setData] = useState<OnboardingType>(initialData)
  function updateFields(fields: Partial<OnboardingType>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo, getFirstInvalidStep, setValidIndex, validCountArr, prev } = useMultistepForm([

    <GenericForm 
      key={0} 
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaName),
        defaultValues: {
          name: data.name,
        },
      })}
      name="name"
      formSchema={formSchemaName}
      updateFields={updateFields}
    />,
    <GenericForm 
      key={1} 
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaEmail),
        defaultValues: {
          email: data.email,
        },
      })}
      name="email"
      formSchema={formSchemaEmail}
      updateFields={updateFields}
    />,
    <GenericForm 
      key={2} 
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaPhoneNo),
        defaultValues: {
          phoneNo: data.phoneNo,
        },
      })}
      name="phoneNo"
      type="number"
      formSchema={formSchemaPhoneNo}
      updateFields={updateFields}
    />,
    <GenericForm 
      key={3} 
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaDob),
        defaultValues: {
          dob: data.dob,
        },
      })}
      name="dob"
      type="date"
      formSchema={formSchemaDob}
      updateFields={updateFields}
    />,
    <GenericForm
      key={4}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaGender),
        defaultValues: {
          gender: data.gender,
        },
      })}
      name="gender"
      type="select"
      formSchema={formSchemaGender}
      updateFields={updateFields}
      selectOptions={["male", "female", "prefer not to say"]}
    />,
  ])
  function getHooks(): multiStepHooksType {
    return {
      steps,
      currentStepIndex,
      step,
      isFirstStep,
      isLastStep,
      goTo,
      back,
      next,
      getFirstInvalidStep,
      setValidIndex,
      validCountArr,
      prev,
    }
  }
  return (
    
    <div>
      <div className="fixed top-0 -left-1 -right-1">
        <Progress value={validCountArr.reduce((x, sm) => x+sm)/steps.length * 100}  className="h-2" />
      </div>
      <div className="h-screen w-screen flex flex-col items-center justify-center
      ">
        {step}
      </div>
    </div>
    
  )
}

export default TypeForm