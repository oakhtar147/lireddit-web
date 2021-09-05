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

interface Props {}

const Register = ({}: Props) => {
  return (
    <Wrapper>
      <Heading m={8} textAlign="center">
        Register
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={values => console.log(values)}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FieldInput
              name="username"
              placeholder="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
            />
            <Box mt={4}>
              <FieldInput
                name="password"
                placeholder="password"
                type="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              color="white"
              backgroundColor="teal"
              _hover={{
                backgroundColor: "teal.500",
              }}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
