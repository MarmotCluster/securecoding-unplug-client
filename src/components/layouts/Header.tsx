import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderRequirements {
    title?: string;
    subtitle?: string;
    renderBackward?: boolean;
    renderLinkSettings?: boolean;
    renderSubTitle?: boolean;
}

const Header = ({
    title = 'Welcome',
    subtitle = 'None',
    renderBackward = false,
    renderLinkSettings = true,
    renderSubTitle = true,
}: HeaderRequirements) => {
    return (
        <header className="header">
            <div className="header-backward">
                <Link
                    to="/list"
                    className={`header-backward-icon header-backward-icon__${renderBackward ? 'back' : 'logo'} def-a`}
                ></Link>
            </div>
            <div className="header-text">
                <p className="header-text-menu en-pri wei-400">{title}</p>
                {renderSubTitle && <p className="header-text-sub en-pri wei-300">{subtitle}</p>}
            </div>
            <div className="header-settings">
                {renderLinkSettings && <Link to="/settings" className="header-settings-icon def-a"></Link>}
            </div>
        </header>
    );
};

export default Header;
