import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    function closeDropdown() {
        setIsOpen(false);
    }
    const handleClick = () => {
        toggleDropdown();
        setNotifying(false);
    };
    return (_jsx("div", { className: "relative" }));
}
