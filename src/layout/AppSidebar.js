import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { getUser } from '../services/AuthServices';
// Assume these icons are imported from an icon library
import { ChevronDownIcon, GridIcon, HorizontaLDots, UserCircleIcon, ProductIcon, SupplierIcon, PembelianIcon, PenjualanIcon, CategoryIcon, KasirIcon, } from '../icons';
import { useSidebar } from '../context/SidebarContext';
import SidebarWidget from './SidebarWidget';
// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       { name: "Line Chart", path: "/line-chart", pro: false },
//       { name: "Bar Chart", path: "/bar-chart", pro: false },
//     ],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       { name: "Alerts", path: "/alerts", pro: false },
//       { name: "Avatar", path: "/avatars", pro: false },
//       { name: "Badge", path: "/badge", pro: false },
//       { name: "Buttons", path: "/buttons", pro: false },
//       { name: "Images", path: "/images", pro: false },
//       { name: "Videos", path: "/videos", pro: false },
//     ],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];
const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();
    const [role, setRole] = useState(null);
    const [navItems, setNavItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});
    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const data = await getUser();
                const userRole = data.role || 'kasir';
                setRole(userRole);
                if (userRole === 'manager') {
                    setNavItems([
                        { icon: _jsx(GridIcon, {}), name: 'Dashboard', path: '/' },
                        { icon: _jsx(ProductIcon, {}), name: 'Produk', path: '/Product' },
                        { icon: _jsx(CategoryIcon, {}), name: 'Kategori', path: '/Category' },
                        { icon: _jsx(SupplierIcon, {}), name: 'Supplier', path: '/supplier' },
                        { icon: _jsx(UserCircleIcon, {}), name: 'Pelanggan', path: '/pelanggan' },
                        { icon: _jsx(PembelianIcon, {}), name: 'Pembelian', path: '/PembelianList' },
                        { icon: _jsx(PenjualanIcon, {}), name: 'Penjualan', path: '/Penjualan' },
                        { icon: _jsx(KasirIcon, {}), name: 'Kasir', path: '/kasir' },
                        { icon: _jsx(UserCircleIcon, {}), name: 'Users', path: '/users' },
                    ]);
                }
                else {
                    setNavItems([
                        { icon: _jsx(GridIcon, {}), name: 'Dashboard', path: '/' },
                        { icon: _jsx(UserCircleIcon, {}), name: 'Transaksi', path: '/kasir' },
                        { icon: _jsx(UserCircleIcon, {}), name: 'Riwayat Penjualan', path: '/penjualan' },
                    ]);
                }
            }
            catch (err) {
                console.error('Gagal ambil role:', err);
                // fallback
                setRole('kasir');
                setNavItems([
                    { icon: _jsx(GridIcon, {}), name: 'Dashboard', path: '/' },
                    { icon: _jsx(UserCircleIcon, {}), name: 'Transaksi', path: '/kasir' },
                    { icon: _jsx(UserCircleIcon, {}), name: 'Riwayat Penjualan', path: '/penjualan' },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUserRole();
    }, []);
    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);
    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prev) => prev?.type === menuType && prev.index === index ? null : { type: menuType, index });
    };
    const renderMenuItems = (items, menuType) => (_jsx("ul", { className: "flex flex-col gap-4", children: items.map((nav, index) => (_jsxs("li", { children: [nav.subItems ? (_jsxs("button", { onClick: () => handleSubmenuToggle(index, menuType), className: `menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? 'menu-item-active'
                        : 'menu-item-inactive'} cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`, children: [_jsx("span", { className: `menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                ? 'menu-item-icon-active'
                                : 'menu-item-icon-inactive'}`, children: nav.icon }), (isExpanded || isHovered || isMobileOpen) && (_jsx("span", { className: "menu-item-text", children: nav.name })), (isExpanded || isHovered || isMobileOpen) && (_jsx(ChevronDownIcon, { className: `ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                ? 'rotate-180 text-brand-500'
                                : ''}` }))] })) : (nav.path && (_jsxs(Link, { to: nav.path, className: `menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`, children: [_jsx("span", { className: `menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`, children: nav.icon }), (isExpanded || isHovered || isMobileOpen) && (_jsx("span", { className: "menu-item-text", children: nav.name }))] }))), nav.subItems && (isExpanded || isHovered || isMobileOpen) && (_jsx("div", { ref: (el) => {
                        subMenuRefs.current[`${menuType}-${index}`] = el;
                    }, className: "overflow-hidden transition-all duration-300", style: {
                        height: openSubmenu?.type === menuType && openSubmenu?.index === index
                            ? `${subMenuHeight[`${menuType}-${index}`]}px`
                            : '0px',
                    }, children: _jsx("ul", { className: "mt-2 space-y-1 ml-9", children: nav.subItems.map((subItem) => (_jsx("li", { children: _jsxs(Link, { to: subItem.path, className: `menu-dropdown-item ${isActive(subItem.path)
                                    ? 'menu-dropdown-item-active'
                                    : 'menu-dropdown-item-inactive'}`, children: [subItem.name, _jsxs("span", { className: "flex items-center gap-1 ml-auto", children: [subItem.new && (_jsx("span", { className: `ml-auto ${isActive(subItem.path)
                                                    ? 'menu-dropdown-badge-active'
                                                    : 'menu-dropdown-badge-inactive'} menu-dropdown-badge`, children: "new" })), subItem.pro && (_jsx("span", { className: `ml-auto ${isActive(subItem.path)
                                                    ? 'menu-dropdown-badge-active'
                                                    : 'menu-dropdown-badge-inactive'} menu-dropdown-badge`, children: "pro" }))] })] }) }, subItem.name))) }) }))] }, nav.name))) }));
    return (_jsxs("aside", { className: `fixed top-0 left-0 px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen z-50 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
    ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0`, onMouseEnter: () => !isExpanded && setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx("div", { className: `py-6 flex-shrink-0 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'} flex`, children: _jsx(Link, { to: "/", children: isExpanded || isHovered || isMobileOpen ? (_jsx("img", { src: "/images/logo/logo-muriatani.png", alt: "Logo", width: 150, height: 40 })) : (_jsx("img", { src: "/images/logo/logo-muriatani.png", alt: "Logo", width: 32, height: 32 })) }) }), _jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-6", children: [_jsx("nav", { className: "mb-6", children: _jsx("div", { className: "flex flex-col gap-4", children: _jsxs("div", { children: [_jsx("h2", { className: `mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`, children: isExpanded || isHovered || isMobileOpen ? 'Menu' : _jsx(HorizontaLDots, {}) }), loading ? (_jsx("p", { className: "text-xs text-gray-400 ml-2", children: "Memuat menu..." })) : (renderMenuItems(navItems, 'main'))] }) }) }), isExpanded || isHovered || isMobileOpen ? _jsx(SidebarWidget, {}) : null] })] }));
};
export default AppSidebar;
