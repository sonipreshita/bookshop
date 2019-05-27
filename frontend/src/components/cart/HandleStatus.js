import React from 'react';
import PropTypes from 'prop-types';

class HandleStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        if (this.props.status === 'Confirmed') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.status === 'Cancelled') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _34zSUK" />
                                <div className="_2WCkH8 IfEXn5"><span>Cancelled</span></div>
                                <div className="_3fauu1" />
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.status === 'Packed') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.status === 'Shipped') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3d2A_X" />
                                <div className="_2WCkH8 _3_eq33"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.status === 'Delivered') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else if (this.props.status === 'Returned') {
            return (
                <div className="">
                    <div className="col-md-8 _2osiT7">
                        <div className="">
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS " />
                                <div className="_2WCkH8 _2vzDqQ" ><span>Confirmed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Packed</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Shipped</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqIS" />
                                <div className="_2WCkH8 _2vzDqQ"><span>Delivered</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3" /></div>
                            </div>
                            <div className="_3pgCve _3FA7sv">
                                <div className="_2Lh8O4 _3iVqISD" />
                                <div className="_2WCkH8 _2vzDqQD"><span>Returned</span></div>
                                <div className="_3fauu1"><div className="empty _1Z66-3D" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
HandleStatus.propTypes = {
    status: PropTypes.string,
};
export default HandleStatus;
