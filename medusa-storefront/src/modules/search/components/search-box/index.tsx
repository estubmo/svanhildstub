import { XMarkMini } from '@medusajs/icons';
import { FormEvent, useEffect } from 'react';

import SearchBoxWrapper, {
    ControlledSearchBoxProps,
} from '../search-box-wrapper';

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  onFocus,
  onBlur,
  close,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
      close && close();
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.stopPropagation();
        event.preventDefault();

        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        } else {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputRef]);

  return (
    <div {...props} className="z-20 w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between relative">
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }
            }}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="text-base-regular placeholder:text-base-regular h-6 flex-shrink bg-transparent placeholder:text-ui-fg-on-color placeholder:transition-colors focus:outline-none"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="absolute right-0 txt-compact-large hidden items-center justify-center gap-x-2 text-ui-fg-on-color flex-shrink-0 focus:outline-none sm:flex"
            >
              <XMarkMini />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

type SearchBoxProps = {
  onFocus?: () => void;
  onBlur?: () => void;
  close?: () => void;
  shouldFocus?: boolean;
};

const SearchBox = ({
  close,
  onFocus,
  onBlur,
  shouldFocus = false,
}: SearchBoxProps) => {
  return (
    <SearchBoxWrapper shouldFocus={shouldFocus}>
      {(props) => (
        <ControlledSearchBox
          close={close}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
