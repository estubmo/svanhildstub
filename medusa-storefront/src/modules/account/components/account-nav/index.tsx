'use client';

import { ArrowRightOnRectangle } from '@medusajs/icons';
import { Customer } from '@medusajs/medusa';
import { clx } from '@medusajs/ui';
import { signOut } from '@modules/account/actions';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import ChevronDown from '@modules/common/icons/chevron-down';
import MapPin from '@modules/common/icons/map-pin';
import Package from '@modules/common/icons/package';
import User from '@modules/common/icons/user';
import { useParams, usePathname } from 'next/navigation';

const AccountNav = ({
  customer,
}: {
  customer: Omit<Customer, 'password_hash'> | null;
}) => {
  const route = usePathname();
  const { countryCode } = useParams();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <div className="small:hidden">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="text-small-regular flex items-center gap-x-2 py-2"
          >
            <>
              <ChevronDown className="rotate-90 transform" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between border-b border-gray-200 px-8 py-4"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 px-8 py-4"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route!}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
};

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={clx('text-ui-fg-subtle hover:text-ui-fg-base', {
        'font-semibold text-ui-fg-base': active,
      })}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;
