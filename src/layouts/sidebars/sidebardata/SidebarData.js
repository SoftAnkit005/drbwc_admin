import { MdOutlineCategory, MdOutlineReviews } from 'react-icons/md';
import { RiCoupon3Line, RiListOrdered2 } from 'react-icons/ri';
import { LuTags, LuUsers2 } from "react-icons/lu";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoHomeOutline, IoImagesOutline, IoSettingsOutline } from "react-icons/io5";

const SidebarData = [
  // {
  //   title: 'Dashboards',
  //   href: '/dashboards',
  //   id: 1,
  //   suffix: '4',
  //   suffixColor: 'bg-cyan rounded-pill text-dark-white',
  //   icon: <Icon.Home />,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Minimal',
  //       href: '/dashboards/minimal',
  //       icon: <Icon.Disc />,
  //       id: 1.1,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Analytical',
  //       href: '/dashboards/analytical',
  //       icon: <Icon.Disc />,
  //       id: 1.2,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Demographical',
  //       href: '/dashboards/demographical',
  //       icon: <Icon.Disc />,
  //       id: 1.3,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Modern',
  //       href: '/dashboards/modern',
  //       icon: <Icon.Disc />,
  //       id: 1.4,
  //       collapisble: false,
  //     },
  //   ],
  // },
  { caption: 'Quick Links' },
  { title: 'Dashboard', href: '/dashboard', icon: <IoHomeOutline className='fs-3' />, id: 1.1, collapisble: false, },

  { caption: 'Catalog' },
  { title: 'Products', href: '/products', icon: <HiOutlineInboxStack className='fs-3' />, id: 2.1, collapisble: false, },
  { title: 'Banner', href: '/banner', icon: <IoImagesOutline className='fs-3' />, id: 2.2, collapisble: false, },
  { title: 'Categories', href: '/categories', icon: <MdOutlineCategory className='fs-3' />, id: 2.3, collapisble: false, },
  // { title: 'Attributes', href: '/attributes', icon: <MdSettingsInputComponent className='fs-3' />, id: 2.4, collapisble: false, },
  { title: 'Tags', href: '/tags', icon: <LuTags className='fs-3' />, id: 2.5, collapisble: false, },
  { title: 'Reviews', href: '/reviews', icon: <MdOutlineReviews className='fs-3' />, id: 2.6, collapisble: false, },
  { title: 'Featured Product', href: '/featured-product', icon: <IoImagesOutline className='fs-3' />, id: 2.7, collapisble: false, },
  // { title: 'Coupons', href: '/coupons', icon: <MdAddLink className='fs-3' />, id: 2.8, collapisble: false, },

  { caption: 'Sale' },
  { title: 'Orders', href: '/orders', icon: <RiListOrdered2 className='fs-3' />, id: 3.1, collapisble: false, },

  { caption: 'Customer' },
  { title: 'Customers', href: '/customers', icon: <LuUsers2 className='fs-3' />, id: 4.1, collapisble: false, },

  { caption: 'Coupons' },
  { title: 'Coupons', href: '/coupons', icon: <RiCoupon3Line className='fs-3' />, id: 5.1, collapisble: false, },

  { caption: 'Setting' },
  { title: 'Setting', href: '/setting', icon: <IoSettingsOutline className='fs-3' />, id: 6.1, collapisble: false, },
];

export default SidebarData;
