import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
export default function DatePicker({ id, mode, onChange, label, defaultDate, placeholder, }) {
    useEffect(() => {
        const flatPickr = flatpickr(`#${id}`, {
            mode: mode || "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "Y-m-d",
            defaultDate,
            onChange,
        });
        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    }, [mode, onChange, id, defaultDate]);
    return (_jsxs("div", { children: [label && _jsx(Label, { htmlFor: id, children: label }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: id, placeholder: placeholder, className: "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800" }), _jsx("span", { className: "absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400", children: _jsx(CalenderIcon, { className: "size-6" }) })] })] }));
}
