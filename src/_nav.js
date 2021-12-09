import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cilBuilding, cilSpeedometer, } from '@coreui/icons'
import { faAddressBook, faBox, faCubes, faFileUpload, faHandshake, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Organization',
  },

  {
    component: CNavItem,
    name: 'Departments',
    to: '/department/view',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pipeline',
    to: '/document/view',
    icon: <FontAwesomeIcon icon={faCubes} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Documents',
    to: '/document/view',
    icon: <FontAwesomeIcon icon={faFileUpload} className="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/user/view',
    icon: <FontAwesomeIcon icon={faIdBadge} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Work',
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/order/view',
    icon: <FontAwesomeIcon icon={faBox} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Offers',
    to: '/offer/view',
    icon: <FontAwesomeIcon icon={faHandshake} className="nav-icon" />,
  }, {
    component: CNavItem,
    name: 'Sellers',
    to: '/seller/view',
    icon: <FontAwesomeIcon icon={faAddressBook} className="nav-icon" />,
  },
  // {

  // }

  // ],
  // },

]

export default _nav
