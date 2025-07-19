import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { getUser } from '../services/AuthServices';

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  UserCircleIcon,
  ProductIcon,
  SupplierIcon,
  PembelianIcon,
  PenjualanIcon,
  CategoryIcon,
  KasirIcon,
} from '../icons';
import { useSidebar } from '../context/SidebarContext';
import SidebarWidget from './SidebarWidget';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

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

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const data = await getUser();
        const userRole = data.role || 'kasir';
        setRole(userRole);

        if (userRole === 'manager') {
          setNavItems([
            { icon: <GridIcon />, name: 'Dashboard', path: '/' },
            { icon: <ProductIcon />, name: 'Produk', path: '/Product' },
            { icon: <CategoryIcon />, name: 'Kategori', path: '/Category' },
            { icon: <SupplierIcon />, name: 'Supplier', path: '/supplier' },
            { icon: <UserCircleIcon />, name: 'Pelanggan', path: '/pelanggan' },
            { icon: <PembelianIcon />, name: 'Pembelian', path: '/PembelianList' },
            { icon: <PenjualanIcon />, name: 'Penjualan', path: '/Penjualan' },
            { icon: <KasirIcon />, name: 'Kasir', path: '/kasir' },
            { icon: <UserCircleIcon />, name: 'Users', path: '/users' },
          ]);
        } else {
          setNavItems([
            { icon: <GridIcon />, name: 'Dashboard', path: '/' },
            { icon: <UserCircleIcon />, name: 'Transaksi', path: '/kasir' },
            { icon: <UserCircleIcon />, name: 'Riwayat Penjualan', path: '/penjualan' },
          ]);
        }
      } catch (err) {
        console.error('Gagal ambil role:', err);
        // fallback
        setRole('kasir');
        setNavItems([
          { icon: <GridIcon />, name: 'Dashboard', path: '/' },
          { icon: <UserCircleIcon />, name: 'Transaksi', path: '/kasir' },
          { icon: <UserCircleIcon />, name: 'Riwayat Penjualan', path: '/penjualan' },
        ]);
      } finally {
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

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prev) =>
      prev?.type === menuType && prev.index === index ? null : { type: menuType, index }
    );
  };

  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? 'rotate-180 text-brand-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen z-50 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
    ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`py-6 flex-shrink-0 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'} flex`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/logo-muriatani.png" alt="Logo" width={150} height={40} />
          ) : (
            <img src="/images/logo/logo-muriatani.png" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      {/* Sidebar menu */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? 'Menu' : <HorizontaLDots />}
              </h2>

              {loading ? (
                <p className="text-xs text-gray-400 ml-2">Memuat menu...</p>
              ) : (
                renderMenuItems(navItems, 'main')
              )}
            </div>

            {/* Others (optional) */}
            {/* <div>... */}
          </div>
        </nav>

        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
