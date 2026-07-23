export type ErrorEntry = {
  error: string,
  message?: string,
  shorthand?: string,
}

export type ErrorGroup = {
  [key: string]: ErrorEntry | ErrorGroup
}

export type FlatFieldError = {
  type: string,
  error: string,
  message?: string,
  shorthand?: string,
}

export type FieldErrors = {
  [key: string]: FlatFieldError[]
}