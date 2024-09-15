import axios from 'axios';


class ArticlesService {
     getAllArticles = async () => {

        const articles  = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles`)

        return  articles.data
    }


    getArticleById = async (id:number) => {

        const articles  = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/articles/${id}`)

        return  articles.data
    }
}

export const api = new ArticlesService()