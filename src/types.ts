export interface Article {
    uuid: string;
    title: string;
    description: string;
    snippet: string;
    url: string;
    image_url: string;
    published_at: string;
    source: string;
    categories: string[];
}

export interface NewsResponse {
    meta: {
        found: number;
        returned: number;
        limit: number;
        page: number;
    };
    data: Article[];
}