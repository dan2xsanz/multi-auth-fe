export interface ResponseInterface {
    isSuccess: boolean;
    message: string;
    messageParams: any;
    resultData: any;
    errorMessages: string[];
    errorCodes: any;
    exceptionType: string;
}
