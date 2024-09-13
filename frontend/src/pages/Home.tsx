import { Box, chakra, Image, Container, Heading, Button, Grid, GridItem } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import React from 'react';
import styled from '@emotion/styled';
import { IoLogoWhatsapp, IoLogoLinkedin, IoLogoJavascript } from 'react-icons/io5';
import { FaTelegramPlane, FaReact } from 'react-icons/fa';
import {
    SiTypescript,
    SiCypress,
    SiPlaywright,
    SiNestjs,
    SiMongodb,
    SiPython,
    SiPlotly
} from 'react-icons/si';

import { TbSql } from 'react-icons/tb';

const ProfileImage = chakra(Image, {
    shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop)
});

const Paragraph = styled.p`
    text-align: justify;
    padding-top: 1rem;
`;

const Social = styled.a`
    textdecoration: none;
`;

export const Home: React.FC = () => (
    <>
        <Helmet>
            <title>Oleksandr Chako</title>
            <meta name="description" content="about oleksandr chako page" />
            <meta property="og:title" content="Oleksandr Chako" />
            <meta property="og:description" content="about oleksandr chako page" />
            <meta property="og:url" content="https://aboutalex.com.ua/about" />
            <meta property="og:type" content="website" />
        </Helmet>
        <Container py={5}>
            <Box
                border="1px"
                borderColor="gray.400"
                borderRadius="lg"
                my={6}
                py={3}
                textAlign="center"
            >
                Hello, I&apos;m software engineer in test!
            </Box>

            <Box display={{ md: 'flex' }} py={5}>
                <Box flexGrow={1}>
                    <Heading as="h2" variant="page-title">
                        Oleksandr Chako
                    </Heading>
                    <p>
                        I&apos;m a software developer in tests with a passion for building modern
                        and flexible digital services. I can manage all things with planning,
                        designing and testing applications.
                    </p>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    flexShrink={0}
                    mt={{ base: 4, md: 0 }}
                    ml={{ md: 6 }}
                    textAlign="center"
                    justifyContent="space-around"
                >
                    <Box
                        borderColor="whiteAlpha.800"
                        borderWidth={2}
                        borderStyle="solid"
                        w="170px"
                        h="170px"
                        display="inline-block"
                        borderRadius="full"
                        overflow="hidden"
                    >
                        <ProfileImage
                            src={`${process.env.PUBLIC_URL}/img/photo.jpg`}
                            alt="Profile image"
                            borderRadius="full"
                            width="100%"
                            height="100%"
                        />
                    </Box>
                </Box>
            </Box>

            <Box textAlign={'center'} py={5}>
                <a href={`${process.env.PUBLIC_URL}/Olexander_Chako_CV.pdf`} download>
                    <Button colorScheme="teal" variant="solid">
                        Download CV
                    </Button>
                </a>
            </Box>

            <Box py={5}>
                <Heading as="h4" size="md" variant="section-title">
                    Things I&apos;m doing...
                </Heading>
                <Paragraph>
                    I&apos;m a skilled AQA engineer with a passion for building digital
                    services/stuff I want. I have a knack for all things testing and developing
                    products, from planning and designing all the way to solving real-life problems
                    with code.
                </Paragraph>
            </Box>

            <Box py={5}>
                <Heading as="h4" size="md" variant="section-title">
                    My stack
                </Heading>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} py={4}>
                    <GridItem>
                        <IoLogoJavascript color="#F7E017" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiTypescript color="#2E78C7" fontSize="2.8em" />
                    </GridItem>
                    <GridItem>
                        <SiPython color="#20A422" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <TbSql color="#31648C" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiMongodb color="#58AA50" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiCypress color="#3B3B3B" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiPlaywright color="#3B3B3B" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <FaReact color="#60DBFB" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiNestjs color="#EA2845" fontSize="3em" />
                    </GridItem>
                    <GridItem>
                        <SiPlotly color="#E53C42" fontSize="3em" />
                    </GridItem>
                </Grid>
            </Box>

            <Box py={5}>
                <Heading as="h3" variant="section-title">
                    Catch up with me
                </Heading>
                <Container
                    display="flex"
                    flex-wrap="wrap"
                    gap={6}
                    px={0}
                    py={4}
                    maxW="container.md"
                    flexWrap="wrap"
                >
                    <Social href="https://wa.me/380982829279" target="_blank">
                        <Button
                            variant="outline"
                            colorScheme="whatsapp"
                            leftIcon={<IoLogoWhatsapp />}
                        >
                            Whatsapp
                        </Button>
                    </Social>
                    <Social
                        href="https://www.linkedin.com/in/alexander-chako-907624154/"
                        target="_blank"
                    >
                        <Button
                            variant="outline"
                            colorScheme="linkedin"
                            leftIcon={<IoLogoLinkedin />}
                        >
                            LinkedIn
                        </Button>
                    </Social>
                    <Social href="https://t.me/AleksandrChako" target="_blank">
                        <Button
                            variant="outline"
                            colorScheme="telegram"
                            leftIcon={<FaTelegramPlane />}
                        >
                            Telegram
                        </Button>
                    </Social>
                </Container>
            </Box>
        </Container>
    </>
);

export default Home;
