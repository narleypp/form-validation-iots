import * as t from "io-ts";
import { withMessage } from "io-ts-types";

// First Name
const isFirstName = (value: string): boolean => value.length >= 3;

interface FirstNameBrand {
  readonly FirstName: unique symbol;
}

export const firstNameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, FirstNameBrand> => isFirstName(value),
    "FirstName"
  ),
  () => "Required. Must be at least 3 characters long."
);

// Last Name
const isLastName = (value: string): boolean => value.length >= 5;

interface LastNameBrand {
  readonly LastName: unique symbol;
}

export const lastNameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, LastNameBrand> => isLastName(value),
    "LastName"
  ),
  () => "Required. Must be at least 5 characters long."
);

// Email
const isEmail = (value: string): boolean => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(value);
};

interface EmailBrand {
  readonly Email: unique symbol;
}

export const emailCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isEmail(value),
    "Email"
  ),
  () => "Required. Must be a valid email."
);

// Date of Birth
// TODO

// Form validation
export const createUserCodec = t.type({
  firstName: firstNameCodec,
  lastName: lastNameCodec,
  email: emailCodec
});

// Types for compile time
export type Email = t.TypeOf<typeof emailCodec>;
export type FirstName = t.TypeOf<typeof firstNameCodec>;
export type LastName = t.TypeOf<typeof lastNameCodec>;
export type CreateUser = t.TypeOf<typeof createUserCodec>;
