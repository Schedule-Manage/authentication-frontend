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
// import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons";

export default function Register(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleLoginButton radius="lg">Google</GoogleLoginButton>
        <GithubLoginButton radius="lg">Github</GithubLoginButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
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
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
          radius="md"
        />
        <Group position="apart" mt="xl">
          <Anchor type="button" color="dimmed" size="xs">
            <Text>Already have an account? Login"</Text>
          </Anchor>
          <Button type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
