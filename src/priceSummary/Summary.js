import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { getTotalPrice, summaryDisplay } from '../reducers';
import styled from 'styled-components';

const secondStyle = StyleSheet.create({
    td: {
        paddingBottom: 10,
        lineHeight: 2.5,
    },
    summary_card: {
        fontSize: 16,
        width: '100%',
    },
    price: {

    },
    icon: {
        marginLeft: 3,
    },
});
const thirdStyle = StyleSheet.create({
    summary_card: {
        fontSize: 16,
        width: '100%',
        marginBottom: 10,
    },
    td: {
        fontSize: 24,
        lineHeight: '30px',
    },
    extra: {
        marginTop: '20px',
        color: '#757575',
    },
});

const A = styled.a`
&:hover{
    cursor: pointer;
}`
class InviteCode extends React.Component {
    constructor() {
        super();
        this.state = {
            displayForm: false,
            displaySummary: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheckCode = () => {
            this.setState({displaySummary: true});
        }
    }
    onSubmit() {
        this.setState({ displayForm: !this.state.displayForm })
    }
    render() {

        return (
            <tr className={css(secondStyle.td) }>
                <td>
                    {this.state.displaySummary ?
                        <span>Referral Discount</span> :
                        <div>
                            {!this.state.displayForm ?
                                <A onClick={this.onSubmit}>Referral Code</A> :
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Invite Code" />
                                    <span className="input-group-btn">
                                        <button onClick={this.onCheckCode}  className="btn btn-default" type="button">Apply Code!</button>
                                    </span>
                                </div>    }
                        </div>} 
                </td>
                {this.state.displaySummary? <td className="text-right price-item__price">- ₦1500</td>: null}
            </tr>


        )
    }
}

let SecondSection = ({ display = false, summary, totalPrice }) => (
    <div className={`panel-body hide-sm ${display ? '' : 'hidden-xs'}`}>
        <table className={css(secondStyle.summary_card) }>
            <tbody>
                <tr className={css(secondStyle.td) }>
                    <td >{summary} </td >
                    <td className="text-right price-item__price">
                        <div className="">{totalPrice}</div >
                    </td >
                </tr>
                <tr className={css(secondStyle.td) }>
                    <td> Service fee
                        <i className={`fa fa-question-circle ${css(secondStyle.icon)}`} />
                    </td >
                    <td className="text-right price-item__price">₦2000</td >
                </tr >
                <InviteCode />

            </tbody >
        </table >
    </div >
);
SecondSection.propTypes = {
    display: PropTypes.bool,
    summary: PropTypes.string,
    totalPrice: PropTypes.string,
};

let ThirdSection = ({ actualPrice, processingFee = 2000 }) => (
    <div className="panel-body hide-sm">
        <div className="sidebar-text-large space-2">
            <table className={css(thirdStyle.summary_card) }>
                <tbody>
                    <tr className={css(thirdStyle.td) }>
                        <td> Total &nbsp; </td >
                        <td className="text-right price-item__price">
                            <div className="">{`₦${actualPrice + processingFee}`}
                            </div >
                        </td >
                    </tr >
                </tbody >
            </table >
        </div >
        <div className={`hidden-xs ${css(thirdStyle.extra)}`}>
            NB: Service Fee is a one time payment
        </div >
    </div >
);
ThirdSection.propTypes = {
    actualPrice: PropTypes.number,
    processingFee: PropTypes.number,
};
const mProps1 = (state, props) => {
    const price = parseInt(props.price, 0);
    return {
        totalPrice: getTotalPrice(state, price, 0),
        summary: summaryDisplay(state),
        actualPrice: getTotalPrice(state, price, 0, false),
        processingFee: state.processingFee,
    };
};
SecondSection = connect(mProps1, null)(SecondSection);
ThirdSection = connect(mProps1, null)(ThirdSection);

const MobileAffix = ({ mobile, action, price, processingFee }) => (
    <div>
        {mobile ?
            <div>
                    <SecondSection display={action}  price={price}/>
                    <hr style={{ marginTop: 0 }} />
                    <ThirdSection mobile={action}  price={price} />
                </div>
            :
            <div>
                <SecondSection display={action}  price={price} />
                <hr style={{ marginTop: 0 }} />
                <ThirdSection mobile={action} price={price} />
            </div> }
    </div>
);
export default MobileAffix;
