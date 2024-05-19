export interface CreateAccountInterface {
  fName?: string
  lName?: string
  email?: string
  password?: string
  verifyPassword?: string
  otp?: string
  isForgotPass?: boolean
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
