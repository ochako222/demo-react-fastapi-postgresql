export interface FirebasePostsI {
    title: string;
    markdown: string;
    thumbnail: string;
    color: string;
}

export interface Post extends FirebasePostsI {
    id: string;
}
