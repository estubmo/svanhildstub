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
        <div className="relative flex items-center justify-between">
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
            className="text-base-regular placeholder:text-base-regular h-full w-full bg-transparent placeholder:text-ui-fg-on-color placeholder:transition-colors focus:outline-none"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="txt-compact-large absolute right-0 hidden h-5 w-5 flex-shrink-0 items-center justify-center gap-x-2 text-ui-fg-muted transition-colors ease-out hover:text-ui-fg-base focus:outline-none sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                <line x1="18" x2="12" y1="9" y2="15" />
                <line x1="12" x2="18" y1="9" y2="15" />
              </svg>
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
