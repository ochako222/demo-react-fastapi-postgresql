import {
    Box,
    Button,
    Container,
    Flex,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IoLogoGithub } from 'react-icons/io5';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/AuthContext';

export const Navbar: React.FC = () => {
    const context = useContext(AuthContext);

    const logo = () => {
        if (context.isLogged) {
            return <Button onClick={context.logOut}>Log out</Button>;
        }
        return (
            <Button onClick={() => context.login()} variant="ghost" size="lg">
                Oleksandr Chako
            </Button>
        );
    };

    return (
        <header>
            <Box
                position="relative"
                as="nav"
                w="100%"
                css={{ backdropFilter: 'blur(10px)' }}
                zIndex={2}
            >
                <Container
                    display="flex"
                    p={2}
                    maxW={{ base: 'container.md', md: 'container.lg', lg: '60%' }}
                >
                    <Flex align="center" mr={5}>
                        {logo()}
                    </Flex>
                    <Flex
                        justify="right"
                        gap="5"
                        direction={{ base: 'column', md: 'row' }}
                        display={{ base: 'none', md: 'flex' }}
                        width={{ base: 'full', md: 'auto' }}
                        alignItems="center"
                        flexGrow={2}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Link p={2} href="/about" style={{ color: 'inherit' }}>
                            About
                        </Link>
                        <Link p={2} bg="grassTeal" href="/posts" style={{ color: 'inherit' }}>
                            Posts
                        </Link>
                        <Link
                            p={2}
                            bg="grassTeal"
                            display="inline-flex"
                            alignItems="center"
                            style={{ gap: 4, color: 'inherit' }}
                            pl={2}
                            href="https://github.com/ochako222/ochako-fastapi-react"
                        >
                            <IoLogoGithub />
                            Source
                        </Link>
                        <Link href="https://buymeacoffee.com/aboutalex">
                            <Image
                                objectFit="cover"
                                src={`${process.env.PUBLIC_URL}/coffee.webp`}
                                alt="Dan Abramov"
                                width="10em"
                            />
                        </Link>
                    </Flex>

                    <Box
                        flex={1}
                        ml={2}
                        textAlign={'right'}
                        display={{ base: 'inline-block', md: 'none' }}
                    >
                        <Menu isLazy id="navbar-menu">
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                                variant="outline"
                                aria-label="Options"
                            />
                            <MenuList>
                                <MenuItem
                                    as={Link}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    href="/about"
                                >
                                    About
                                </MenuItem>
                                <MenuItem
                                    as={Link}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    href="/posts"
                                >
                                    Posts
                                </MenuItem>
                                <MenuItem
                                    as={Link}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    href="https://github.com/ochako222/ochako-fastapi-react"
                                >
                                    View Source
                                </MenuItem>
                                <MenuItem
                                    as={Link}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    href="https://buymeacoffee.com/aboutalex"
                                >
                                    <Image
                                        objectFit="cover"
                                        src={`${process.env.PUBLIC_URL}/coffee.webp`}
                                        alt=""
                                        width="10em"
                                    />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Container>
            </Box>
        </header>
    );
};

export default Navbar;
