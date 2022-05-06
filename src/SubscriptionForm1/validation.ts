import { pipe, flow } from "fp-ts/function";
import { Errors } from "io-ts";
import { failure } from "io-ts/PathReporter";
import * as E from "fp-ts/Either";
import {
  firstNameCodec,
  lastNameCodec,
  emailCodec,
  FirstName,
  LastName,
  Email
} from "../types";

type ValidateFormField = (
  fieldName: string,
  fieldValue: unknown,
  setError: (_: string) => void
) => void;

export const validateFormField: ValidateFormField = (
  fieldName,
  fieldValue,
  setError
) => {
  switch (fieldName) {
    case "firstName":
      pipe(
        fieldValue,
        firstNameCodec.decode,
        E.bimap(
          (error: Errors) => setError(failure(error).join("")),
          (_: FirstName) => setError("")
        )
      );
      break;
    case "lastName":
      flow(
        lastNameCodec.decode,
        E.bimap(
          (error: Errors) => setError(failure(error).join("")),
          (_: LastName) => setError("")
        )
      )(fieldValue);
      break;
    case "email":
      flow(
        emailCodec.decode,
        E.bimap(
          (error: Errors) => setError(failure(error).join("")),
          (_: Email) => setError("")
        )
      )(fieldValue);
      break;
    default:
      console.log(`Unknown field: ${fieldName}`);
  }
};
