import {
  createStyles,
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

// Styles for the page
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export default function NewPassword() {
  const bearerToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      newPassword: (val) => (val.length < 8 ? null : "Invalid token"),
      confirmNewPassword: (val, values) =>
        val === values.newPassword
          ? null
          : "Password confirmation should match the password",
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Enter Your New Password
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter new password and password confirmation
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/auth/update/password",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
            data: {
              newPassword: form.values.newPassword,
              confirmNewPassword: form.values.confirmNewPassword,
            },
          })
            .then((res: any) => {
              if (res.data.status === 200) {
                notifications.show({
                  title: `Password Updated Successfully`,
                  message: `Login to proceed`,
                  color: "green",
                  autoClose: 2000,
                  icon: <IconCheck />,
                });
                navigate("/");
              } else {
                notifications.show({
                  title: `Invalid token`,
                  message: `Check if you entered the correct information🤥`,
                  color: "red",
                  autoClose: 2000,
                  icon: <IconX />,
                });
              }
            })
            .catch(() => {
              notifications.show({
                title: `Invalid Username or token address`,
                message: `Check if you entered the correct information🤥`,
                color: "red",
                autoClose: 2000,
                icon: <IconX />,
              });
            });
        })}
      >
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          {/* Text input for token */}
          <PasswordInput
            label="New Password"
            value={form.values.newPassword}
            onChange={(event) =>
              form.setFieldValue("newPassword", event.target.value)
            }
            placeholder="Enter your new password"
            error={form.errors.newPassword}
            required
          />

          {/* For new password confirmation */}
          <PasswordInput
            label="Confirm New Password"
            value={form.values.confirmNewPassword}
            onChange={(event) =>
              form.setFieldValue("confirmNewPassword", event.target.value)
            }
            placeholder="Confirm your new password"
            error={form.errors.confirmNewPassword}
            required
          />

          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <NavLink to={"/"}>
                <Center inline>
                  <IconArrowLeft size={rem(12)} stroke={1.5} />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </NavLink>
            </Anchor>
            <Button className={classes.control} type="submit">
              Submit
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
