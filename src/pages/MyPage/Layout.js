import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { LbSubTitle } from '../../components/Typography'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { profileRouteItems } from './MyPageRoutes'
import classNames from 'classnames'

const LbSideItem = ({ label, to, selected }) => {
  return (
    <li>
      <Link to={to}
        className={classNames("block px-4 py-3 text-white hover:text-white -skew-x-12 lb-title-font lb-transition", {
          " lb-btn-color-sel": selected,
          " lb-btn-color": !selected,
        })}
      >
        <div className="skew-x-12">
          {label}
        </div>
      </Link>
    </li>
  );
}

const LbSideItemMobile = ({ label, to, selected }) => {
  return (
    <li>
      <Link to={to}
        className={classNames("block px-4 py-2 rounded-md lb-title-font lb-transition", {
          " lb-btn-color-sel": selected,
          " lb-btn-color": !selected,
        })}
      >
        {label}
      </Link>
    </li>
  );
}

export const MyPageLayout = () => {
  const location = useLocation();
  const [where, setWhere] = useState('');

  useEffect(() => {
    setWhere(location.pathname.split('/')[2]);
  }, [location]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="text-white bg-gray-800 lb-bg-img-content lb-content-size">
      <main className="h-full px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between pb-2 pt-4 h-[4.5rem]">
          <LbSubTitle>MY PAGE</LbSubTitle>

          <div className="flex items-center">
            <button
              type="button"
              className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-100 lb-transition sm:ml-6 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              onMouseEnter={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading">
          <div className="flex gap-x-4 gap-y-10">
            {/* Filters */}
            <div className="hidden lg:block bg-[#00000040] px-8 py-8 rounded-xl min-w-[15rem] h-[calc(100vh-14rem)] overflow-auto">
              <ul className="pb-6 space-y-2 text-sm text-white">
                {
                  profileRouteItems.map((item) => (
                    <LbSideItem key={item.label} label={item.label} to={item.link} selected={item.link === where} />
                  ))
                }
              </ul>
            </div>

            {/* Product grid */}
            <div className="grow bg-[#00000040] rounded-xl pt-8 pb-4 px-4 h-[calc(100vh-14rem)] overflow-auto">
              <Outlet />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile filter dialog */}
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
                      profileRouteItems.map((item) => (
                        <LbSideItemMobile key={item.label} label={item.label} to={item.link} selected={item.link === where} />
                      ))
                    }
                  </ul>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
                                 