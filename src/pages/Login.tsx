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
import axios from "axios";
// import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons";

export default function Login(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 5
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, Register with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleLoginButton radius="xl">Google</GoogleLoginButton>
        <GithubLoginButton radius="xl">Github</GithubLoginButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {
        axios
          .post("http://localhost:3000/api/v1/auth/login", {
            email: form.values.email,
            password: form.values.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })}>
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
            <Text>Don't have an account? Register</Text>
          </Anchor>
          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
