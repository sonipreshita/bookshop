import React from 'react';
import { Link } from 'react-router';

class AccountOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <div className="_1GRhLX -yAF57" style={{ 'display': 'flex' }}>
                    <img className="fUkK-z" height="50px" width="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvEe-EiT5IhK-B_U9SSQTE-JK2_A2Pt3y4c1FAyHPRMySkdnD" />
                    <div className="M6fKa7">
                        <div className="e1sGxS">
                            <div className="_2T2Tfl">Hello</div>
                        </div>
                    </div>
                </div>
                <div className="_1GRhLX _1DGSPv">
                    <div>
                        <div className="_2ACZMj">
                            <div className="_3NNJZh" style={{ 'display': 'flex' }}>
                                <Link className="_2ZZi8V" to="/orderdetails">My Orders
                                <span className="_16k-VF">
                                        <svg width="16" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_13rI_R">
                                            <path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#878787" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="_1zr6a1" />
                    </div>
                    <div>
                        <div className="_2ACZMj">
                            <div className="_3NNJZh" style={{ 'display': 'flex' }}>
                                <div className="_2ZZi8V" >Account Setting</div>
                            </div>
                            <div>
                                {/* <Link to="/accountdetails"><div className="NqIFxw HDbIt8">Personal Information</div></Link> */}
                                <Link to="/account/changepassword"><div className="NqIFxw HDbIt8">Change Password</div></Link>
                                <Link to="/account/address"><div className="NqIFxw HDbIt8">Address</div></Link>
                            </div>
                        </div>
                        <div className="_1zr6a1" />
                    </div>
                    <div>
                        <div className="_2ACZMj">
                            <div className="_3NNJZh" style={{ 'display': 'flex' }}>
                                <div className="_2ZZi8V" >My Stuff</div>
                            </div>
                            <div>
                                <Link to="/wishlist"><div className="NqIFxw HDbIt8">My WishList</div></Link>
                            </div>
                        </div>
                        <div className="_1zr6a1" />
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountOptions;
