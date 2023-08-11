import "../index.css";
import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
} from "@mantine/core";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function Profile(props: PaperProps) {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      currentPassword: (val) =>
        val.length <= 1 ? "Current Password should not be empty" : null,
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
    <div className="profile-container">
      <div>
        <Text>Ian Kamau</Text>
        <Text>kian99564@gmail.com</Text>
        <Text>Ian Kamau</Text>
      </div>

      <Paper
        radius="md"
        p="xl"
        {...props}
        style={{
          width: "30%",
        }}
      >
        <Text size="lg" weight={500}>
          Your Profile Page
        </Text>
        <form
          onSubmit={form.onSubmit(() => {
            axios({
              method: "post",
              url: `${process.env.SERVER_URL}/auth/update/password`,
              data: {
                currentPassword: form.values.currentPassword,
                newPassword: form.values.newPassword,
                confirmNewPassword: form.values.confirmNewPassword,
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
          <PasswordInput
            required
            label="Current Password"
            placeholder="Enter Your Current Password"
            value={form.values.currentPassword}
            onChange={(event) =>
              form.setFieldValue("currentPassword", event.currentTarget.value)
            }
            error={form.errors.currentPassword}
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
            label="Confirm New Password"
            placeholder="Enter New Password"
            value={form.values.confirmNewPassword}
            onChange={(event) =>
              form.setFieldValue(
                "confirmNewPassword",
                event.currentTarget.value
              )
            }
            error={form.errors.confirmNewPassword}
            radius="md"
          />

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
