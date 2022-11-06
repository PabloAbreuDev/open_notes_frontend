import { useState } from "react";
import { SubMenuStyled } from "./styled";

export type SubMenuOptions = {
    option: string;
    action: () => Promise<void>
}

type SubMenuType = {
    options: SubMenuOptions[]
    isVisible: boolean,
    addDefaultOption: () => void,
    onClose: () => void
}


function SubMenu({ addDefaultOption, isVisible, options, onClose }: SubMenuType) {

    if (!isVisible) {
        return null
    }


    return <SubMenuStyled>
        <ul className="menu">
            {options?.map((item) => <li className="menu-item" onClick={() => item.action()}>{item.option}</li>)}
        </ul>
    </SubMenuStyled>

}

export default SubMenu