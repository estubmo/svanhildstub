// import { useQuery } from '@lib/context/query-context';
// import { useDebounce } from '@lib/hooks/use-debounce';
// import { useRouter } from 'next/navigation';
// import { ChangeEvent, FormEvent, RefObject, useEffect, useRef } from 'react';
// import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch';
//
// export type ControlledSearchBoxProps = React.ComponentProps<'div'> & {
//   inputRef: RefObject<HTMLInputElement>;
//   onChange(_event: ChangeEvent): void;
//   onReset(_event: FormEvent): void;
//   onSubmit?(_event: FormEvent): void;
//   close?: () => void;
//   placeholder?: string;
//   value: string;
// };
//
// type SearchBoxProps = {
//   children: (_state: {
//     value: string;
//     inputRef: RefObject<HTMLInputElement>;
//     onChange: (_event: ChangeEvent<HTMLInputElement>) => void;
//     onReset: () => void;
//     placeholder: string;
//   }) => React.ReactNode;
//   placeholder?: string;
//   shouldFocus?: boolean;
// } & UseSearchBoxProps;
//
// const SearchBoxWrapper = ({
//   children,
//   placeholder = 'Search products...',
//   shouldFocus = false,
//   ...rest
// }: SearchBoxProps) => {
//   const { refine } = useSearchBox(rest);
//
//   const { value, setValue } = useQuery();
//
//   const debouncedSearchTerm = useDebounce(value, 100);
//
//   useEffect(() => {
//     refine(debouncedSearchTerm);
//   }, [debouncedSearchTerm, refine]);
//
//   const inputRef = useRef<HTMLInputElement>(null);
//
//   const router = useRouter();
//
//   const onReset = () => {
//     setValue('');
//   };
//
//   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setValue(event.currentTarget.value);
//   };
//
//   const onSubmit = () => {
//     const trimmed = value.trim();
//     if (trimmed) {
//       router.replace(`/store/results/${trimmed}`);
//     }
//   };
//
//   useEffect(() => {
//     if (inputRef.current && shouldFocus) {
//       inputRef.current.focus();
//     }
//   }, [shouldFocus]);
//
//   const state = {
//     value,
//     inputRef,
//     onChange,
//     onSubmit,
//     onReset,
//     placeholder,
//   };
//
//   return children(state) as React.ReactElement;
// };
//
// export default SearchBoxWrapper;
