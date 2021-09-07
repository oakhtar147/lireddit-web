import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FieldInput from "../components/FieldInput";
import Wrapper from "../components/Wrapper";
import { useLoginUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/urqlClient";

interface Props {}

const Login = ({}: Props) => {
  const router = useRouter();
  const [{ error, fetching }, loginUser] = useLoginUserMutation();

  return (
    <Wrapper>
      <Heading m={8} textAlign='center'>
        Login
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await loginUser({ loginInput: values });
          console.log(response.data);
          if (response.data?.login?.errors) {
            const { errors } = response.data.login;
            setErrors(toErrorMap(errors, values));
          } else if (response.data?.login?.user) {
            console.log("here");
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient())(Login);
