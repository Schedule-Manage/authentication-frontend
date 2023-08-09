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
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Register(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 4
          ? "Password should include at least 4 characters"
          : null,
      password_confirmation: (val, values) =>
        val === values.password
          ? null
          : "Password confirmation should match the password",
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, Register with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleLoginButton radius="lg">Google</GoogleLoginButton>
        <GithubLoginButton radius="lg">Github</GithubLoginButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/auth/register",
            data: {
              names: form.values.name,
              email: form.values.email,
              password: form.values.password,
              password_confirmation: form.values.password_confirmation,
            },
          })
            .then((res: any) => {
              if (res.status === 200) {
                // localStorage.setItem("uid", res.data._id);
                // localStorage.setItem("accessToken", res.data.accessToken);
                // localStorage.setItem("username", res.data.username);
                notifications.show({
                  title: `Account Created Successfull`,
                  message: `Welcome`,
                  color: "green",
                  autoClose: 2000,
                  icon: <IconCheck />,
                });

                // const accessToken = localStorage.getItem("accessToken");
                // if (accessToken) {
                //   navigate("/landing");
                // }
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
          label="Name"
          placeholder="Your name"
          value={form.values.name}
          onChange={(event) =>
            form.setFieldValue("name", event.currentTarget.value)
          }
          radius="md"
        />
        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
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
          error={form.errors.password}
          radius="md"
        />
        <PasswordInput
          required
          label="Password Confirmation"
          placeholder="Confirm Your password"
          value={form.values.password_confirmation}
          onChange={(event) =>
            form.setFieldValue(
              "password_confirmation",
              event.currentTarget.value
            )
          }
          error={form.errors.password_confirmation}
          radius="md"
        />
        <Group position="apart" mt="xl">
          <Anchor type="button" color="dimmed" size="xs">
            <NavLink to={"/"}>Already have an account? Login"</NavLink>
          </Anchor>
          <Button type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
