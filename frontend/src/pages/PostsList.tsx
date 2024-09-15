import { Spinner, Container, Box, Button, SimpleGrid } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { api } from "src/api/articles.service";
import { BlogCard } from "src/components/BlogCard";
import { AuthContext } from "src/context/AuthContext";
import { ArticleResponseT } from "src/types";


export const PostsList: React.FC = () => {
    const context = useContext(AuthContext);
    const [postsList, updatePostsList] = useState<ArticleResponseT[]>();

    const deletePost = async (id: number) => {
        await api.deleteArticle(id)
        const newPostsList = postsList?.filter((el) => el.id !== id);
        updatePostsList(newPostsList);
    };


    useEffect(() => {
        const setPost = async () => {
            const articles = await api.getAllArticles();
            if(Array.isArray(articles) && !!articles.length){
                updatePostsList(articles);
            }else{
                console.log('there are not articles...')
            }
        };
        setPost();
    }, []);

    const renderPosts = (arr: ArticleResponseT[]) =>
        arr.map((item: ArticleResponseT) => (
            <BlogCard
                post={item}
                key={item.id}
                isLoggedIn={context.isLogged}
                // Here we pass the deletePost function to the BlogCard component
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
                    {context.isLogged ? (
                        <Link to="/posts/new">
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
