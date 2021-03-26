import Logo from './Logo.js'
import Button from './Button.js'

function Header(props) {
    return (
        <div className="AbsPos TopLeft FullWidthHeight Header">
            <Logo imagePath={props.imagePath} />
            <Button style={{ left: '75%' }} active={props.activeButton} onClick={props.onClick} text="Timeline"/>
            <Button style={{ left: '87%' }} active={!props.activeButton} onClick={props.onClick} text="Profile"/>
        </div>
    );
}

export default Header;