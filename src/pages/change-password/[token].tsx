import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import FieldInput from "../../components/FieldInput";
import Wrapper from "../../components/Wrapper";
import { useUpdatePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import createUrqlClient from "../../utils/urqlClient";
import Toast from "../../components/Toast";
import customToast from "../../components/Toast";
import { useToast, UseToastOptions } from "@chakra-ui/react";

interface Props {
  token: string;
}

const toastOptions = {
  duration: 5000,
  isClosable: true,
};

const successToast: UseToastOptions = {
  title: "Updated Password",
  description: "Your account password has been successfully changed.",
  status: "success",
  ...toastOptions,
};

const ChangePassword: NextPage<{ token: string }> = ({ token }: Props) => {
  const [{ fetching, data }, updatePassword] = useUpdatePasswordMutation();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  return (
    <div>
      <Wrapper>
        <Heading m={8} textAlign='center'>
          Update Password
        </Heading>

        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updatePassword({
              options: {
                token,
                newPassword: values.newPassword,
              },
            });

            if (response.data?.updatePassword.errors) {
              console.log(response.data?.updatePassword.errors);
              setErrors(
                toErrorMap(response.data.updatePassword.errors, values)
              );
            } else if (response.data?.updatePassword.user) {
              setSuccess(true);
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <FieldInput
                name='newPassword'
                placeholder='New Password'
                label='New Password'
                value={values.newPassword}
                onChange={handleChange}
              />
              <Button
                mt={4}
                type='submit'
                color='white'
                backgroundColor='teal'
                _hover={{
                  backgroundColor: "teal.500",
                }}
                onClick={() => success && toast(successToast)}
                isLoading={isSubmitting || fetching}
                isDisabled={!!data?.updatePassword.user}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      token: params!.token,
    },
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
