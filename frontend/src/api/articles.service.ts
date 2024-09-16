import axios from 'axios';
import { ArticleCreationT, ArticlePatchT } from 'src/types';

class ArticlesService {
    getAllArticles = async () => {
        const articles = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles`);

        return articles.data;
    };

    getArticleById = async (id: number) => {
        const articles = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}`);

        return articles.data;
    };

    postArticle = async (article: Omit<ArticleCreationT, 'date_creation'>) => {
        const data = new Date();

        const articles = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/articles`, {
            ...article,
            date_creation: data
        });

        return articles.data;
    };

    deleteArticle = async (id: number) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}`);
    };

    patchArticle = async (id: number, article: ArticlePatchT) => {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}`, article);
    };
}

export const api = new ArticlesService();
