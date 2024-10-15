export interface CreateAccountInterface {
  id?: number
  fName?: string
  lName?: string
  email?: string
  password?: string
  verifyPassword?: string
  otp?: string
  isForgotPass?: boolean
  profileImg?: any
  coverImg?: any
}

export const createAccountDefaultValues: CreateAccountInterface = {
  fName: '',
  lName: '',
  email: '',
  password: '',
  verifyPassword: '',
  otp: '',
  isForgotPass: false,
}
