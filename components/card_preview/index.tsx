import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ICardInfo, ITagInfo } from "../../interface/card";
import { abbreviation } from "../../utils/string";
import { CardPreviewStyled, TagStyled } from "./styled";



function CardPreview({ card, tags }: { card: ICardInfo, tags: ITagInfo[] }) {




    return <CardPreviewStyled>
        <div className="header">
            <div className="title"><pre>{abbreviation(card.title, 20)}</pre></div>
        </div>
        <div className="body">
            <ReactMarkdown children={card.content} remarkPlugins={[remarkGfm]} />
        </div>
        <div className="footer">
            {tags.map((item) => Tag(item))}
        </div>

    </CardPreviewStyled>;
}

export function Tag(tag: ITagInfo) {
    return <TagStyled key={tag._id} className="tag_pill">{abbreviation(tag.name, 15)}</TagStyled>
}

export default CardPreview;
