import { useState, FormEvent } from "react";
import { validateFormField } from "./validation";

const SubscriptionForm1 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Form submitted.");
  };

  type HandleInputChange = (
    field: string,
    setValue: (_: string) => void,
    setError: (_: string) => void
  ) => (e: FormEvent<HTMLInputElement>) => void;

  const handleInputChange: HandleInputChange = (
    fieldName,
    setValue,
    setError
  ) => (e) => {
    const fieldValue = e.currentTarget.value;
    setValue(fieldValue);
    validateFormField(fieldName, fieldValue, setError);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field-container">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            onChange={handleInputChange(
              "firstName",
              setFirstName,
              setFirstNameError
            )}
          />
        </div>
        <div className="error-container">
          {firstNameError && <p>{firstNameError}</p>}
        </div>

        <div className="form-field-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastname"
            type="text"
            onChange={handleInputChange(
              "lastName",
              setLastName,
              setLastNameError
            )}
          />
        </div>
        <div className="error-container">
          {lastNameError && <p>{lastNameError}</p>}
        </div>

        <div className="form-field-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={handleInputChange("email", setEmail, setEmailError)}
          />
        </div>
        <div className="error-container">
          {emailError && <p>{emailError}</p>}
        </div>

        <div className="button-container">
          <button>Submit</button>
        </div>
      </form>
      <div className="box">
        <p>{`First name is: ${firstName}`}</p>
        <p>{`Last name is: ${lastName}`}</p>
        <p>{`Email is: ${email}`}</p>
      </div>
    </div>
  );
};

export default SubscriptionForm1;
