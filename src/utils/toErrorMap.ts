import { FieldError } from "../generated/graphql";

export function toErrorMap<Values extends Record<string, string>>(errors: Array<FieldError>, values: Values) {
  const errorMap: Record<string, string> = {};

  for (const [key, _] of Object.entries(values)) {
    errorMap[key] = errors
      .filter(err => err.field === key)
      .map(err => err.message)[0];
    }

  return errorMap;
}