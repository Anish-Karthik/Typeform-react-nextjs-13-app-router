

import React from 'react'
import TypeForm from './_components/typeform'
import { OnboardingType } from '@/lib/utils'
const initialData: OnboardingType = {
  name: '',
  email: '',
  phoneNo: '',
  dob: '',
  gender: '',
  country: '',
  state: '',
  city: '',
  employmentStatus: '',
  howDidHear: ''
}

const page = () => {

  return (
    <TypeForm initialData={initialData} />
  )
}

export default page