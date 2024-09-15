import { Container, Input, Button, Heading } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { api } from "src/api/articles.service";
import ThumbnailPreview from "src/components/ThumbnailPreview";
import { AuthContext } from "src/context/AuthContext";
import { ArticleCreationT } from "src/types";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';



export const EditPost = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);

    const [article, updatePost] = useState<Omit<ArticleCreationT, 'date_creation'>>({
        title: '',
        markdown: '',
        thumbnail: '',
        color: '#000000'
    });


    useEffect(() => {
        const setPost = async () => {
            if (id) {
                const article = await api.getArticleById(+id);

                updatePost(article);
            }
        };

        setPost();
    }, []);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updatePost({
            ...article,
            title: event.target.value
        });
    };

    const onMarkdownChange = (value: string) => {
        updatePost({
            ...article,
            markdown: value
        });
    };

    const onFileChange = async (value: string) => {
        updatePost({
            ...article,
            thumbnail: value
        });
    };

    const onColorChange = async (value: string) => {
        updatePost({
            ...article,
            color: value
        });
    };

    const postPost = async () => {
        if (id && id !== 'new') {
            // logic for updating existing post
            // set(ref(db, `posts/${id}`), {
            //     markdown: post.markdown,
            //     title: post.title,
            //     thumbnail: post.thumbnail,
            //     color: post.color
            // });
        } else {
            // Logic for creating new post
            // const postListRef = ref(db, `posts/`);
            // const newPostRef = push(postListRef);

            await api.postArticle({
                markdown: article.markdown,
                title: article.title,
                thumbnail: article.thumbnail,
                color: article.color
            })

    
        }
    };

    const loggedView = (
        <>
            <Container maxW="4xl" py={'5'}>
                <Input value={article.title} onChange={onTitleChange} />
                <Button onClick={postPost} colorScheme="blue" marginTop={'1em'}>
                    Post topic
                </Button>
                <ThumbnailPreview
                    color={article.color}
                    thumbnail={article.thumbnail}
                    onFileChange={onFileChange}
                    onColorChange={onColorChange}
                />

                <MDEditor
                    value={article.markdown}
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
                    source={article.markdown}
                    style={{ whiteSpace: 'pre-wrap', paddingTop: '1.5em' }}
                />
            </Container>
        </>
    );

    const guestView = (
        <>
            <Helmet>
                <title>{article.title ?? 'new article'}</title>
                <meta name="description" content={article.title} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.title} />
                <meta property="og:url" content={`https://aboutalex.com.ua/posts/${id}`} />
                <meta property="og:type" content="website" />
            </Helmet>
            <Container py={'5'} maxW="4xl">
                <Button onClick={()=>console.log(article)}>foo</Button>
                <Heading as="h3" fontSize={20} mb={4}>
                    {article.title}
                </Heading>
                <MDEditor.Markdown source={article.markdown} />
            </Container>
        </>
    );

    return <>{context.isLogged ? loggedView : guestView}</>;
};

export default EditPost;
