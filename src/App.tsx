import "./styles.css";
import SubscriptionForm1 from "./SubscriptionForm1";
import SubscriptionForm2 from "./SubscriptionForm2";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <h2>Validation on field change</h2>
        <SubscriptionForm1 />
      </div>
      <div>
        <h2>Validation on form submit</h2>
        <SubscriptionForm2 />
      </div>
    </div>
  );
}
