export interface Comment {
    name: string,
    comment: string,
    postedAt: Date,
    replies?:{
        name:string,
        reply: string
    },
    postId:string
}
