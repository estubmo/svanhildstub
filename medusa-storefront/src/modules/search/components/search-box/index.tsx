import { XMarkMini } from "@medusajs/icons";
import { FormEvent, useEffect } from "react";
import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper";

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
      if (event.ctrlKey && event.key === "k") {
        event.stopPropagation();
        event.preventDefault();

        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        } else {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [inputRef]);

  return (
    <div {...props} className="w-full z-20">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between">
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
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
            className="h-6 placeholder:text-ui-fg-on-color text-base-regular placeholder:text-base-regular placeholder:transition-colors focus:outline-none flex-1 bg-transparent"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="items-center justify-center text-ui-fg-on-color focus:outline-none gap-x-2 px-2 txt-compact-large hidden sm:flex"
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
