
export default class blogEntry
{
    id
    title
    content
    date
    image
    constructor(id, title, content, imageurl)
    {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = new Date().getUTCDate();
        this.image = imageurl;
    }
};