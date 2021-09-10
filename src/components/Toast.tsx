import { Button, useToast, UseToastOptions } from "@chakra-ui/react";

interface ToastProps extends UseToastOptions {}

export default function customToast(props: ToastProps) {
  const toast = useToast();
  return toast({
    ...props,
  });
}
