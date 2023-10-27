import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'
import { mainRouteItems } from '../MainRoutes'

const LbNavbarItem = ({ label, to, selected, skew }) => {
  return (
    <Link to={to}
      className={classNames("text-sm leading-6 lb-transition text-white hover:text-white lb-title-font px-4 py-3", {
        'skew-x-12': skew,
        'lb-btn-color-sel': selected,
        'lb-btn-color': !selected,
      })}
    >
      <div className={classNames({
        '-skew-x-12': skew
      })}>
        {label}
      </div>
    </Link>
  );
}

const LbNavbarItemMobile = ({ label, to, selected }) => {
  return (
    <li>
      <Link to={to}
        className={classNames("block rounded-lg px-3 py-2 text-base leading-7 lb-transition text-white lb-title-font", {
          "lb-btn-color-sel": selected,
          "lb-btn-color": !selected,
        })}
      >
        {label}
      </Link>
    </li>
  );
}


export const LbNavbar = () => {
  const location = useLocation();
  const [where, setWhere] = useState('');

  useEffect(() => {
    setWhere(location.pathname.split('/')[1]);
  }, [location]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 w-full bg-gray-900 lb-header-size">
      <nav className="flex justify-between p-4 my-auto lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              className: 'lb-text-font text-sm sm:text-base',
              style: {
                backgroundColor: '#444',
                color: '#fff',
                boxShadow: '0.4em -0.4em 1.6em #00000090',
              },
            }}
          />
          <Link to="" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="absolute w-auto h-28 left-4 -top-8" src="/img/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex my-auto lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-100 lb-transition"
            onClick={() => setMobileMenuOpen(true)}
            onMouseEnter={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-1">
          {
            mainRouteItems.map((route) => {
              var visible = true;
              if (route.show_on_signed_in === true || route.protected === true) {
                visible = isLoggedIn();
              } else if (route.show_on_signed_out === true) {
                visible = !isLoggedIn();
              }
              return visible
                ? <LbNavbarItem key={route.label} label={route.label} to={route.link} selected={where === route.link} skew={true} />
                : null;
            })
          }
        </Popover.Group>
      </nav>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear lb-transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear lb-transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="lb-transition ease-in-out transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="lb-transition ease-in-out transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                className="relative ml-auto flex h-full w-full max-w-[15rem] flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl"
                onMouseLeave={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-white bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <ul className="px-2 py-3 space-y-2 text-white">
                    {
                      mainRouteItems.map((route) => {
                        var visible = true;
                        if (route.show_on_signed_in === true || route.protected === true) {
                          visible = isLoggedIn();
                        } else if (route.show_on_signed_out === true) {
                          visible = !isLoggedIn();
                        }
                        return visible
                          ? <LbNavbarItemMobile key={route.link} label={route.label} to={route.link} selected={route.link === where} />
                          : null;
                      })
                    }
                  </ul>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header >
  )
}
             