// export interface FirebasePostsI {
//     title: string;
//     markdown: string;
//     thumbnail: string;
//     color: string;
// }

// export interface Post extends FirebasePostsI {
//     id: string;
// }



export interface Post {
    id: number
    date_creation:string
    title:string
    color:string
    markdown:string
    thumbnail:string
}