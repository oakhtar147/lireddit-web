import { Box, Button, Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FieldInput from "../components/FieldInput";
import Wrapper from "../components/Wrapper";
import { useRegisterUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/urqlClient";

interface Props {}

const Register = ({}: Props) => {
  const router = useRouter();
  const [{ error, fetching, data }, registerUser] = useRegisterUserMutation();

  if (error) {
    console.log(error.graphQLErrors);
  }

  return (
    <Wrapper>
      <Heading m={8} textAlign='center'>
        Register
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await registerUser({ registerInput: values });
          if (response.data?.register?.errors) {
            const { errors } = response.data.register;
            setErrors(toErrorMap(errors, values));
          } else if (response.data?.register?.user) {
            router.push("/");
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient())(Register);
