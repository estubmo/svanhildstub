import { Button, Container, Text } from '@medusajs/ui';

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  const resetOnboarding = () => {
    window.sessionStorage.setItem('onboarding', 'false');
  };

  return (
    <Container className="h-full w-full max-w-4xl bg-ui-bg-subtle">
      <div className="center flex flex-col gap-y-4 p-4 md:items-center">
        <Text className="text-xl text-ui-fg-base">
          Your test order was successfully created! 🎉
        </Text>
        <Text className="text-small-regular text-ui-fg-subtle">
          You can now complete setting up your store in the admin.
        </Text>
        <a
          href={`http://localhost:7001/a/orders/${orderId}`}
          onClick={resetOnboarding}
        >
          <Button className="w-full">Complete setup in admin</Button>
        </a>
      </div>
    </Container>
  );
};

export default OnboardingCta;
