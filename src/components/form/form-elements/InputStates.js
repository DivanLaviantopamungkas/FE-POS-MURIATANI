import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
export default function InputStates() {
    const [email, setEmail] = useState("");
    const [emailTwo, setEmailTwo] = useState("");
    const [error, setError] = useState(false);
    // Simulate a validation check
    const validateEmail = (value) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setError(!isValidEmail);
        return isValidEmail;
    };
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };
    const handleEmailTwoChange = (e) => {
        const value = e.target.value;
        setEmailTwo(value);
        validateEmail(value);
    };
    return (_jsx(ComponentCard, { title: "Input States", desc: "Validation styles for error, success and disabled states on form controls.", children: _jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Email" }), _jsx(Input, { type: "email", value: email, error: error, onChange: handleEmailChange, placeholder: "Enter your email", hint: error ? "This is an invalid email address." : "" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Email" }), _jsx(Input, { type: "email", value: emailTwo, success: !error, onChange: handleEmailTwoChange, placeholder: "Enter your email", hint: !error ? "This is an success message." : "" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Email" }), _jsx(Input, { type: "text", value: "disabled@example.com", disabled: true, placeholder: "Disabled email" })] })] }) }));
}
