import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { NavLink } from "react-router-dom";

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

export default function ForgotPassword() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/auth/forgot/password",
            data: {
              email: form.values.email,
            },
          })
            .then((res: any) => {
              if (res.data.status === 200) {
                notifications.show({
                  title: `Request Sent`,
                  message: `A verification email has been sent successfully`,
                  color: "green",
                  autoClose: 2000,
                  icon: <IconCheck />,
                });
              } else {
                notifications.show({
                  title: `Invalid email address or email address not found`,
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
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          {/* Text input for email */}
          <TextInput
            label="Your email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.target.value)
            }
            placeholder="youremail@something.com"
            error={form.errors.email}
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
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
