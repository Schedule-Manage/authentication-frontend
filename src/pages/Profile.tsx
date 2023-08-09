import { NavLink } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
} from "@mantine/core";
// import axios from "axios";
// import { IconCheck, IconX } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";

export default function Profile(props: PaperProps) {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      newPassword: (val) =>
        val.length <= 4
          ? "Password should include at least 4 characters"
          : null,
      confirmNewPassword: (val, values) =>
        val === values.newPassword
          ? null
          : "Password confirmation should match the the new password",
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Your Profile Page
      </Text>
      <form
        onSubmit={form.onSubmit(() => {
          //   axios({
          //     method: "post",
          //     url: "http://localhost:3000/api/v1/auth/login",
          //     data: {
          //       email: form.values.email,
          //       password: form.values.password,
          //     },
          //   })
          //     .then((res: any) => {
          //       if (res.data.status === 200) {
          //         notifications.show({
          //           title: `Login Successfull`,
          //           message: `Welcome back`,
          //           color: "green",
          //           autoClose: 2000,
          //           icon: <IconCheck />,
          //         });
          //       } else {
          //         notifications.show({
          //           title: `Invalid Username or email address`,
          //           message: `Check if you entered the correct information🤥`,
          //           color: "red",
          //           autoClose: 2000,
          //           icon: <IconX />,
          //         });
          //       }
          //     })
          //     .catch(() => {
          //       notifications.show({
          //         title: `Invalid Username or email address`,
          //         message: `Check if you entered the correct information🤥`,
          //         color: "red",
          //         autoClose: 2000,
          //         icon: <IconX />,
          //       });
          //     });
        })}
      >
        <PasswordInput
          required
          label="Old Password"
          placeholder="Enter Old Password"
          value={form.values.currentPassword}
          onChange={(event) =>
            form.setFieldValue("currentPassword", event.currentTarget.value)
          }
          //   error={form.errors.newPassword}
          radius="md"
        />

        <PasswordInput
          required
          label="New Password"
          placeholder="Enter New Password"
          value={form.values.newPassword}
          onChange={(event) =>
            form.setFieldValue("newPassword", event.currentTarget.value)
          }
          error={form.errors.newPassword}
          radius="md"
        />

        <PasswordInput
          required
          label="New Password"
          placeholder="Enter New Password"
          value={form.values.confirmNewPassword}
          onChange={(event) =>
            form.setFieldValue("confirmNewPassword", event.currentTarget.value)
          }
          error={form.errors.confirmNewPassword}
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
