import { Dialog, Transition } from '@headlessui/react';
import { ModalProvider, useModal } from '@lib/context/modal-context';
import X from '@modules/common/icons/x';
import clsx from 'clsx';
import React, { Fragment } from 'react';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  size?: 'small' | 'medium' | 'large';
  search?: boolean;
};

const Modal: React.FC<ModalProps> & {
  Title: React.FC;
  Description: React.FC;
  Body: React.FC;
  Footer: React.FC;
} = ({ isOpen, close, size = 'medium', search = false, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 h-screen bg-opacity-75  backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-hidden">
          <div
            className={clsx(
              'flex h-full min-h-full justify-center p-4 text-center',
              {
                'items-center': !search,
                'items-start': search,
              },
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'flex h-fit max-h-[75vh] w-full transform flex-col justify-start p-5 text-left align-middle transition-all',
                  {
                    'max-w-md': size === 'small',
                    'max-w-xl': size === 'medium',
                    'max-w-3xl': size === 'large',
                    'bg-transparent shadow-none': search,
                    'rounded-rounded border bg-ui-bg-base shadow-xl': !search,
                  },
                )}
              >
                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Title: React.FC = ({ children }) => {
  const { close } = useModal();

  return (
    <Dialog.Title className="flex items-center justify-between">
      <div className="text-large-semi">{children}</div>
      <div>
        <button onClick={close}>
          <X size={20} />
        </button>
      </div>
    </Dialog.Title>
  );
};

const Description: React.FC = ({ children }) => {
  return (
    <Dialog.Description className="text-small-regular flex h-full items-center justify-center pb-4 pt-2 text-ui-fg-subtle">
      {children}
    </Dialog.Description>
  );
};

const Body: React.FC = ({ children }) => {
  return <div className="flex justify-center">{children}</div>;
};

const Footer: React.FC = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-x-4">{children}</div>
  );
};

Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
