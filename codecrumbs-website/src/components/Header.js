import Logo from './Logo.js'
import Button from './Button.js'

function Header(props) {
    return (
        <div className="AbsPos TopLeft FullWidthHeight Header">
            <Logo imagePath={props.imagePath} />
            <Button style={{ left: '87%' }} active={true} onClick={props.onClick} text="Timeline"/>
        </div>
    );
}

export default Header;