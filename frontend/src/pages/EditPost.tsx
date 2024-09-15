import { Container, Input, Button, Heading } from "@chakra-ui/react";
import { ref, set, push } from "firebase/database";
import { get } from "http";
import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ThumbnailPreview from "src/components/ThumbnailPreview";
import { AuthContext } from "src/context/AuthContext";
import { Post } from "src/types";


export const EditPost = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);

    const [post, updatePost] = useState<Post>({
        id: '',
        title: '',
        markdown: '',
        thumbnail: '',
        color: '#000000'
    });

    // useEffect(() => {
    //     console.log('EditPost');
    //     const setPost = async () => {
    //         console.log(id);
    //         if (id && db) {
    //             const postsRef = ref(db, `posts/${id}`);
    //             const snapshot = await get(postsRef);

    //             updatePost(snapshot.val());
    //         }
    //     };

    //     setPost();
    // }, []);

    // const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     updatePost({
    //         ...post,
    //         title: event.target.value
    //     });
    // };

    // const onMarkdownChange = (value: any) => {
    //     updatePost({
    //         ...post,
    //         markdown: value
    //     });
    // };

    // const onFileChange = async (value: string) => {
    //     updatePost({
    //         ...post,
    //         thumbnail: value
    //     });
    // };

    // const onColorChange = async (value: string) => {
    //     updatePost({
    //         ...post,
    //         color: value
    //     });
    // };

    // const postPost = () => {
    //     if (id && db) {
    //         set(ref(db, `posts/${id}`), {
    //             markdown: post.markdown,
    //             title: post.title,
    //             thumbnail: post.thumbnail,
    //             color: post.color
    //         });
    //     } else {
    //         const postListRef = ref(db, `posts/`);
    //         const newPostRef = push(postListRef);

    //         set(newPostRef, {
    //             markdown: post.markdown,
    //             title: post.title,
    //             thumbnail: post.thumbnail,
    //             color: post.color
    //         });
    //     }
    // };

    const loggedView = (
        <>
            <Container maxW="4xl" py={'5'}>
                {/* <Input value={post.title} onChange={onTitleChange} />
                <Button onClick={postPost} colorScheme="blue" marginTop={'1em'}>
                    Post topic
                </Button>
                <ThumbnailPreview
                    color={post.color}
                    thumbnail={post.thumbnail}
                    onFileChange={onFileChange}
                    onColorChange={onColorChange}
                />

                <MDEditor
                    value={post.markdown}
                    onChange={onMarkdownChange}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                        code: ({ children = [], className, ...props }) => {
                            if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
                                const html = katex.renderToString(
                                    children.replace(/^\$\$(.*)\$\$/, '$1'),
                                    {
                                        throwOnError: false
                                    }
                                );
                                return (
                                    <code
                                        dangerouslySetInnerHTML={{ __html: html }}
                                        style={{ background: 'transparent' }}
                                    />
                                );
                            }
                            const code =
                                props.node && props.node.children
                                    ? getCodeString(props.node.children)
                                    : children;
                            if (
                                typeof code === 'string' &&
                                typeof className === 'string' &&
                                /^language-katex/.test(className.toLocaleLowerCase())
                            ) {
                                const html = katex.renderToString(code, {
                                    throwOnError: false
                                });
                                return (
                                    <code
                                        style={{ fontSize: '150%' }}
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    />
                                );
                            }
                            return <code className={String(className)}>{children}</code>;
                        }
                    }}
                />
                <MDEditor.Markdown
                    source={post.markdown}
                    style={{ whiteSpace: 'pre-wrap', paddingTop: '1.5em' }}
                /> */}
            </Container>
        </>
    );

    const unloggedView = (
        <>
            <Helmet>
                <title>{post.title ?? 'new article'}</title>
                <meta name="description" content={post.title} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.title} />
                <meta property="og:url" content={`https://aboutalex.com.ua/posts/${id}`} />
                <meta property="og:type" content="website" />
            </Helmet>
            <Container py={'5'} maxW="4xl">
                {/* <Heading as="h3" fontSize={20} mb={4}>
                    {post.title}
                </Heading>
                <MDEditor.Markdown source={post.markdown} /> */}
            </Container>
        </>
    );

    return <>{context.isLogged ? loggedView : unloggedView}</>;
};

export default EditPost;
