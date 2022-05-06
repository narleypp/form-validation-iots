import { useState, FormEvent } from "react";
import * as t from "io-ts";
import { flow } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { createUserCodec, CreateUser } from "../types";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
}

interface CreateFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SubscriptionForm2 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState("");

  type SetErrors = (errors: t.Errors) => void;
  const setErrors: SetErrors = (errors) => {
    type ErrorsObj = {
      firstNameError?: string;
      lastNameError?: string;
      emailError?: string;
    };
    const errorsObj = errors.reduce<ErrorsObj>(
      (prev, curr) => ({
        ...prev,
        [`${curr?.context[1]?.key}Error`]: curr?.message
      }),
      {}
    );

    if (errorsObj.firstNameError) setFirstNameError(errorsObj.firstNameError);
    if (errorsObj.lastNameError) setLastNameError(errorsObj.lastNameError);
    if (errorsObj.emailError) setEmailError(errorsObj.emailError);
  };

  const handleSubmit = (e: FormEvent<CreateFormElement>): void => {
    e.preventDefault();

    const { firstName, lastName, email } = e.currentTarget.elements;
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    };

    flow(
      createUserCodec.decode,
      E.bimap(
        (errors: t.Errors) => {
          console.log(errors);
          setErrors(errors);
        },
        (_: CreateUser) => {
          e.currentTarget.reset();
          setFormSubmitted("Form Submitted!");
        }
      )
    )(payload);
  };

  type HandleInputChange = (
    setValue: (_: string) => void,
    setError: (_: string) => void
  ) => (e: FormEvent<HTMLInputElement>) => void;

  const handleInputChange: HandleInputChange = (setValue, setError) => (e) => {
    setFormSubmitted("");
    const fieldValue = e.currentTarget.value;
    setValue(fieldValue);
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field-container">
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            onChange={handleInputChange(setFirstName, setFirstNameError)}
          />
        </div>
        <div className="error-container">
          {firstNameError && <p>{firstNameError}</p>}
        </div>
        <div className="form-field-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            id="lastname"
            type="text"
            onChange={handleInputChange(setLastName, setLastNameError)}
          />
        </div>
        <div className="error-container">
          {lastNameError && <p>{lastNameError}</p>}
        </div>
        <div className="form-field-container">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            onChange={handleInputChange(setEmail, setEmailError)}
          />
        </div>
        <div className="error-container">
          {emailError && <p>{emailError}</p>}
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      {formSubmitted && <span className="formSubmitted">{formSubmitted}</span>}
      <div className="box">
        <p>{`First name is: ${firstName}`}</p>
        <p>{`Last name is: ${lastName}`}</p>
        <p>{`Email is: ${email}`}</p>
      </div>
    </div>
  );
};

export default SubscriptionForm2;
