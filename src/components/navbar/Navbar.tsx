import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantine/ds";
import classes from "./HeaderSimple.module.css";
import { nav_link } from "../../helpers/link.helper";

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(nav_link[0].href);

  const items = nav_link.map((link) => (
    <a
      key={link.name}
      href={link.href}
      className={classes.link}
      data-active={active === link.href || undefined}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(link.href);
      // }}
    >
      {link.name}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group>{items}</Group>

        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
      </Container>
    </header>
  );
}
