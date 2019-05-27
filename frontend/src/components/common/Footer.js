import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.position = this.position.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction);
    }

    ComponentWillMount() {
    }

    position() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
    render() {
        let date = new Date();
        let year = date.getFullYear();
        return (
            <div className="footer">
                <div className="content">
                    <div className="navFooterBackToTop">
                        <span className="navFooterBackToTopText"><center>Get to Know Us</center></span>
                    </div>
                    <p className="copyright">Book Redux &copy; {year}</p>
                </div>
                <button onClick={this.position.bind(this)} id="myBtn" title="Go to top">Top</button>
            </div>
        );
    }
}
export default Footer;
