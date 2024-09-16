interface ArticleI {
    id: number;
    date_creation: string;
    title: string;
    color: string;
    markdown: string;
    thumbnail: string;
}

export type ArticleCreationT = Omit<ArticleI, 'id'>;

export type ArticlePatchT = Omit<ArticleCreationT, 'date_creation'>;

export type ArticleResponseT = ArticleI;
