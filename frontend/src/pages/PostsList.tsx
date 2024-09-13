import { Helmet } from 'react-helmet';
import { Box, Button, Container, Spinner, SimpleGrid, Link } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ref, get, remove } from 'firebase/database';
import { BlogCard } from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';
import { Post, FirebasePostsI } from '../types';

export const PostsList: React.FC = () => {
    const context = useContext(AuthContext);
    const [postsList, updatePostsList] = useState<Post[]>();

    const deletePost = (id: string) => {
        if (db) {
            const fooRef = ref(db, `posts/${id}`);
            remove(fooRef);

            const newPostsLiist = postsList?.filter((el) => el.id !== id);
            updatePostsList(newPostsLiist);
        } else {
            console.log('db is null...');
        }
    };

    useEffect(() => {
        const setPost = async () => {
            if (db) {
                const postRef = ref(db, `posts`);
                const snapshot = await get(postRef);

                const fireBasePosts = snapshot.val() as FirebasePostsI[];

                const posts: Post[] = [];

                for (const [key, value] of Object.entries(fireBasePosts)) {
                    posts.push({
                        id: key,
                        title: value.title,
                        markdown: value.markdown,
                        thumbnail: value.thumbnail,
                        color: value.color
                    });
                }

                updatePostsList(posts);
            } else {
                console.log('db is null...');
            }
        };

        setPost();
    }, []);

    const renderPosts = (arr: Post[]) =>
        arr.map((item: Post) => (
            <BlogCard
                post={item}
                key={item.id}
                isLoggedIn={context.isLoggedIn}
                onDelete={deletePost}
            />
        ));

    const posts = postsList?.length ? renderPosts(postsList) : <Spinner />;

    return (
        <>
            <Helmet>
                <title>Posts list</title>
                <meta property="og:title" content="Posts list" />
                <meta name="description" content="Oleksandr Chako posts list" />
                <meta property="og:description" content="Oleksandr Chako posts list" />
                <meta property="og:url" content="https://aboutalex.com.ua/posts" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Container py={5} maxW="4xl">
                <Box>
                    {context.isLoggedIn ? (
                        <Link href="/posts/new">
                            <Button colorScheme="blue">Add Topic</Button>
                        </Link>
                    ) : (
                        ''
                    )}
                </Box>

                <Box py={5}>
                    <SimpleGrid columns={[2, 2, 3]} gap={10}>
                        {posts}
                    </SimpleGrid>
                </Box>
            </Container>
        </>
    );
};

export default PostsList;
