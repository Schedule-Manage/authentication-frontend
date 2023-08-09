import { NavLink } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
} from "@mantine/core";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function Profile(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, Login with
      </Text>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/auth/login",
            data: {
              email: form.values.email,
              password: form.values.password,
            },
          })
            .then((res: any) => {
              if (res.data.status === 200) {
                notifications.show({
                  title: `Login Successfull`,
                  message: `Welcome back`,
                  color: "green",
                  autoClose: 2000,
                  icon: <IconCheck />,
                });
              } else {
                notifications.show({
                  title: `Invalid Username or email address`,
                  message: `Check if you entered the correct information🤥`,
                  color: "red",
                  autoClose: 2000,
                  icon: <IconX />,
                });
              }
            })
            .catch(() => {
              notifications.show({
                title: `Invalid Username or email address`,
                message: `Check if you entered the correct information🤥`,
                color: "red",
                autoClose: 2000,
                icon: <IconX />,
              });
            });
        })}
      >
        <TextInput
          required
          label="Email"
          placeholder="hello@gmail.com"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
          radius="md"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
          radius="md"
        />

        <Group position="apart" mt="xl">
          <Anchor type="button" color="dimmed" size="xs">
            <NavLink to={"register"}>Don't have an account? Register</NavLink>
          </Anchor>

          <Anchor type="button" color="dimmed" size="xs">
            <NavLink to={"reset-password"}>Forgot Password?</NavLink>
          </Anchor>

          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
