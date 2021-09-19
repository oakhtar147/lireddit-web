import { Box, Button, Heading, Link, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FieldInput from "../components/FieldInput";
import Wrapper from "../components/Wrapper";
import { useLoginUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/urqlClient";
import NextLink from "next/link";

interface Props {}

const Login = ({}: Props) => {
  const router = useRouter();
  const [{ fetching, data }, loginUser] = useLoginUserMutation();

  return (
    <Wrapper>
      <Heading m={8} textAlign='center'>
        Login
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await loginUser({ loginInput: values });
          if (response.data?.login?.errors) {
            const { errors } = response.data.login;
            setErrors(toErrorMap(errors, values));
          } else if (response.data?.login?.user) {
            router.replace("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FieldInput
              name='username'
              placeholder='username'
              label='Username'
              value={values.username}
              onChange={handleChange}
            />
            <Box mt={4}>
              <FieldInput
                name='password'
                placeholder='password'
                type='password'
                label='Password'
                value={values.password}
                onChange={handleChange}
              />
            </Box>
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
                Login
              </Button>
              <NextLink href='forgot-password'>
                <Link
                  mt={2}
                  color='blue.500'
                  textDecoration='underline'
                  alignSelf='center'
                >
                  Forgot Password?
                </Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
