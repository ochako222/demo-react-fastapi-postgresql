// export interface FirebasePostsI {
//     title: string;
//     markdown: string;
//     thumbnail: string;
//     color: string;
// }

// export interface Post extends FirebasePostsI {
//     id: string;
// }


interface ArticleI{
    id: number
    date_creation:string
    title:string
    color:string
    markdown:string
    thumbnail:string
}


export type ArticleCreationT = Omit<ArticleI, "id">

export type ArticleResponseT = ArticleI


// export interface ArticleResponseI {
//     id: number
//     date_creation:string
//     title:string
//     color:string
//     markdown:string
//     thumbnail:string
// }

// export interface ArticleCreationI {
//     date_creation:string
//     title:string
//     color:string
//     markdown:string
//     thumbnail:string
// }