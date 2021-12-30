export interface Article{
    id: String,
    deleted?: boolean,
    type: String,
    by: String,
    time: number,
    text?: String,
    dead?: boolean,
    parent?: number,
    poll?: String,
    kids?: number[],
    url: String,
    score?: number,
    title: String,
    parts?: number[],
    descendants?: number
}