import { ErrorMessage } from '@hookform/error-message';
import { ChevronUpDown } from '@medusajs/icons';
import clsx from 'clsx';
import {
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { get } from 'react-hook-form';

export type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = 'Select...',
      errors,
      touched,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    const hasError = props.name
      ? get(errors, props.name) && get(touched, props.name)
      : false;

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === '') {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clsx(
            'text-base-regular relative flex items-center rounded-md border border-ui-border-base bg-ui-bg-field hover:bg-ui-bg-field-hover',
            className,
            {
              'text-ui-fg-muted': isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="flex-1 appearance-none border-none bg-transparent px-4 py-2.5 outline-none transition-colors duration-150 "
          >
            <option
              disabled
              value=""
              className="bg-ui-bg-field hover:bg-ui-bg-field-hover"
            >
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronUpDown />
          </span>
        </div>
        {hasError && props.name && (
          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => {
              return (
                <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                  <span>{message}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  },
);

NativeSelect.displayName = 'NativeSelect';

export default NativeSelect;
