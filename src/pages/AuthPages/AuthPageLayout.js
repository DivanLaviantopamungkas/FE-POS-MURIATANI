import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
export default function AuthLayout({ children, }) {
    return (_jsx("div", { className: "relative p-6 bg-white z-1 dark:bg-gray-100 sm:p-0", children: _jsxs("div", { className: "relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0", children: [children, _jsx("div", { className: "items-center hidden w-full h-full lg:w-1/2 bg-gray-100 dark:bg-white/5 lg:grid", children: _jsxs("div", { className: "relative flex items-center justify-center z-1", children: [_jsx(GridShape, {}), _jsxs("div", { className: "flex flex-col items-center max-w-xs", children: [_jsx(Link, { to: "/", className: "block mb-4", children: _jsx("img", { width: 231, height: 48, src: "/images/logo/logo-muriatani.png", alt: "Logo" }) }), _jsx("p", { className: "text-center text-gray-400 dark:text-white/60", children: "Selamat Datang Admin dan Kasir Muria Tani" })] })] }) }), _jsx("div", { className: "fixed z-50 hidden bottom-6 right-6 sm:block", children: _jsx(ThemeTogglerTwo, {}) })] }) }));
}
