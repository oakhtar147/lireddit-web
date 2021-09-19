import { Box, Button, Heading, Link, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FieldInput from "../components/FieldInput";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/urqlClient";
import { NextPage } from "next";

interface Props {}

const ForgotPassword: NextPage = ({}: Props) => {
  const [{ fetching }, forgotPassword] = useForgotPasswordMutation();
  const [completed, setCompleted] = useState(false);

  return (
    <Wrapper>
      <Heading m={8} textAlign='center'>
        Forgot password
      </Heading>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async ({ email }, { setErrors }) => {
          await forgotPassword({ email });
          setCompleted(true);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            {completed && <Box color='green'>An email has been sent.</Box>}
            <FieldInput
              name='email'
              placeholder='email'
              label='Email'
              type='email'
              value={values.email}
              onChange={handleChange}
            />
            <Flex justifyContent='space-between'>
              <Button
                mt={4}
                type='submit'
                color='white'
                backgroundColor='teal'
                _hover={{
                  backgroundColor: "teal.500",
                }}
                isLoading={isSubmitting || fetching}
              >
                Forgot Password
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
