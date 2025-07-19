import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { login } from "../../services/AuthServices";
export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login({ email, password }); // <-- kirim sebagai objek
            // Kalau ingin simpan ulang user di localStorage, boleh saja
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.role === 'manager') {
                navigate('/');
            }
            else if (data.user.role === 'kasir') {
                navigate('/kasir');
            }
        }
        catch (error) {
            alert('Login gagal: Email atau password salah');
        }
        finally {
            setLoading(false);
        }
        ;
    };
    return (_jsx("div", { className: "flex flex-col flex-1", children: _jsx("div", { className: "flex flex-col justify-center flex-1 w-full max-w-md mx-auto", children: _jsxs("div", { children: [_jsxs("div", { className: "mb-5 sm:mb-8", children: [_jsx("h1", { className: "mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md", children: "Selamat Datang" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Masukan Email Dan Password Untuk Login" })] }), _jsx("div", { children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs(Label, { children: ["Email ", _jsx("span", { className: "text-error-500", children: "*" }), " "] }), _jsx(Input, { placeholder: "info@gmail.com", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { children: [_jsxs(Label, { children: ["Password ", _jsx("span", { className: "text-error-500", children: "*" }), " "] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("span", { onClick: () => setShowPassword(!showPassword), className: "absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2", children: showPassword ? (_jsx(EyeIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) : (_jsx(EyeCloseIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Checkbox, { checked: isChecked, onChange: setIsChecked }), _jsx("span", { className: "block font-normal text-gray-700 text-theme-sm dark:text-gray-400", children: "Keep me logged in" })] }), _jsx(Link, { to: "/reset-password", className: "text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400", children: "Forgot password?" })] }), _jsx("div", { children: _jsx(Button, { className: "w-full", size: "sm", type: "submit", disabled: loading, children: loading ? (_jsxs("svg", { className: "w-5 h-5 mx-auto text-white animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" })] })) : ("Sign in") }) })] }) }) })] }) }) }));
}
