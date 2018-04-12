import React, { Component } from "react";
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import '../Assets/css/bootstrap_white.css';

class Tip extends Component {
    render() {
        const { overlay, classTitle } = this.props
        return (
            <Tooltip
                trigger={['hover', 'click']}
                placement="bottomLeft"
                overlay={<span>{overlay}</span>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                align={{
                    offset: [-20, 3],
                }}
            >
                <a href="tip" className={classTitle}></a>
            </Tooltip>
        )
    }
}

Tip.propTypes = {
    overlay: PropTypes.string,
    classTitle: PropTypes.string,
};

export default Tip;