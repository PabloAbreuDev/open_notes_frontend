import { ICardInfo, ITagInfo } from "../../interface/card";
import { abbreviation } from "../../utils/string";
import { CardPreviewStyled, TagStyled } from "./styled";



function CardPreview({ card, tags }: { card: ICardInfo, tags: ITagInfo[] }) {

    return <CardPreviewStyled>
        <div className="header">
            <div className="title">{abbreviation(card.cardTitle, 20)}</div>
        </div>
        <div className="body">
            <div className="content">{abbreviation(card.cardContent, 300)}</div>
        </div>
        <div className="footer">
            {tags.map((item) => Tag(item))}
        </div>
    </CardPreviewStyled>;
}

export function Tag(tag: ITagInfo) {
    return <TagStyled key={tag.tagId} className="tag_pill">{abbreviation(tag.tagName, 15)}</TagStyled>
}

export default CardPreview;
