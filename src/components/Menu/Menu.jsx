import './Menu.scss';
import {Menu as AntMenu} from 'antd';

const Menu = ({children}) => {
    return (
        <AntMenu className='shadow br-3px'>
            {children}
        </AntMenu>
    );
}

export default Menu;
