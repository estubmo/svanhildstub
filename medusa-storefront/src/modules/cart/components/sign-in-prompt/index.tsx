import { Button, Heading, Text } from '@medusajs/ui';
import Link from 'next/link';

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between bg-ui-bg-base">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Already have an account?
        </Heading>
        <Text className="txt-medium mt-2 text-ui-fg-subtle">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <Link href="/account/login">
          <Button variant="secondary" className="h-10">
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPrompt;
