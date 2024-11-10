export interface CreateAccountInterface {
  id?: number
  email?: string
  password?: string
  verifyPassword?: string
  otp?: string
  isForgotPass?: boolean
  profileImg?: any
  coverImg?: any
  firstName?: string
  lastName?: string
}

export const createAccountDefaultValues: CreateAccountInterface = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  verifyPassword: '',
  otp: '',
  isForgotPass: false,
}
