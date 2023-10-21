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

export default function ResetToken() {
    const navigate = useNavigate();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      token: "",
    },

    validate: {
      token: (val) => (val.length < 8 ? "Invalid token" : null),
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Enter reset token to proceed
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your token to reset your password
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/auth/reset/token",
            data: {
              token: form.values.token,
            },
          })
            .then((res: any) => {
              if (res.data.status === 200) {
                notifications.show({
                  title: `Request Sent`,
                  message: `You can now update your password`,
                  color: "green",
                  autoClose: 2000,
                  icon: <IconCheck />,
                });
                navigate("/new/password");
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
          <TextInput
            label="Your token"
            value={form.values.token}
            onChange={(event) =>
              form.setFieldValue("token", event.target.value)
            }
            placeholder="Enter the secret token"
            error={form.errors.token}
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
