import { logCustomerIn } from '@modules/account/actions';
import { LOGIN_VIEW } from '@modules/account/templates/login-template';
import ErrorMessage from '@modules/checkout/components/error-message';
import { SubmitButton } from '@modules/checkout/components/submit-button';
import Input from '@modules/common/components/input';
import { useFormState } from 'react-dom';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null);

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="text-large-semi mb-6 uppercase">Welcome back</h1>
      <p className="text-base-regular mb-8 text-center text-ui-fg-base">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <ErrorMessage error={message} />
        <SubmitButton className="mt-6 w-full">Sign in</SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
