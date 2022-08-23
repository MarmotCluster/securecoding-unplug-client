import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    renderBackward?: boolean | (() => void);
    renderLinkSettings?: boolean;
    renderSubTitle?: boolean;
    isDark?: boolean;
}

const Header = ({
    title = 'Welcome',
    subtitle = 'None',
    renderBackward = false,
    renderLinkSettings = true,
    renderSubTitle = true,
    isDark = false,
}: HeaderProps) => {
    return (
        <header className="header nowrap" style={{ color: isDark ? 'white' : undefined }}>
            <div className="header-backward">
                {typeof renderBackward === 'boolean' ? (
                    <Link
                        to="/list"
                        className={`header-backward-icon header-backward-icon__${
                            renderBackward ? (isDark ? 'back-dark' : 'back') : 'logo'
                        } def-a`}
                    ></Link>
                ) : (
                    <div
                        className={`pointer header-backward-icon header-backward-icon__${
                            isDark ? 'back-dark' : 'back'
                        } def-a`}
                        onClick={renderBackward}
                    ></div>
                )}
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
