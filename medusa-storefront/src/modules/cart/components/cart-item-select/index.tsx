'use client';

import { clx, IconBadge } from '@medusajs/ui';
import ChevronDown from '@modules/common/icons/chevron-down';
import {
  forwardRef,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = 'Select...', className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(true);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    const updatePlaceholderState = useCallback(() => {
      setIsPlaceholder(!innerRef.current?.value);
    }, []);

    useEffect(() => {
      updatePlaceholderState();
    }, [updatePlaceholderState]);

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            'group txt-compact-small relative flex items-center border text-ui-fg-base',
            className,
            {
              'text-ui-fg-subtle': isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            {...props}
            onChange={(e) => {
              props.onChange?.(e);
              updatePlaceholderState();
            }}
            className="h-16 w-16 cursor-pointer appearance-none items-center justify-center border-none bg-ui-bg-field px-4 transition-colors duration-150 hover:bg-ui-bg-field-hover focus:bg-ui-bg-field-hover"
          >
            <option disabled value="" className="bg-ui-bg-field-hover">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute flex w-8 justify-end group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </IconBadge>
      </div>
    );
  },
);

CartItemSelect.displayName = 'CartItemSelect';

export default CartItemSelect;
