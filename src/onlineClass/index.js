import React from 'react'
import styled from 'styled-components'
import PriceSummary from '../priceSummary'
const Selector = styled.div`
background-color: #fff;
border: 1px #ccc solid;
border-radius: 2px;
display: -moz-inline-stack;
display: inline-block;
zoom: 1;
text-align: center;`

const Top = styled.div`
padding: 20px 10px 20px 10px;`
const Description = styled.div`
    font-size: 13px;
    line-height: 16px;`

const Selection = () => {
    return (
        <div style={{ flexBasis: "27%", flex: 1 }}>
            <Selector>
                <Top>
                    <div style={{ height: 40 }}>
                        <img src="https://prod-takelessons.netdna-ssl.com/images/public/book/thumb.png" alt="Thumb" />
                    </div>
                    <h4 className="Title" style={{ marginTop: 10 }}>The Casual Beginner</h4>
                    <Description>For beginners who just want to try it out.</Description>
                </Top>
                <div className="Bottom" style={{ color: "#406bb2", padding: "20px 10px 20px 10px" }}>
                    <h3 className="Number">1
                        Lesson</h3>

                    <div style={{ margin: "15px 0 5px 0" }}>
                        <div className="SelectList duration">


                            <select className="form-control" name="duration" placeholder="">
                                <option value="5:30">30-min / $70 each</option>
                                <option value="5:45" selected="selected">45-min / $100 each</option>
                                <option value="5:60">60-min / $140 each</option>
                            </select>


                        </div>

                    </div>
                </div>
            </Selector>
        </div>
    )
}
const App = () => {
    return (
        <div>
            <div className="col-sm-8">
                <div style={{marginBottom: 20, textAlign: "center"}}>

                    <h2>Saran offers these lesson packages</h2>
                    <div className="Headline">
                        Select a package to continue. You’re covered by our <h3 style={{ display: "inline" }}>100% Satisfaction Guarantee</h3>

                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <Selection />
                    <Selection />
                    <Selection />
                </div>

            </div>
            <div className="col-sm-3" style={{marginTop: 30}}>
                <PriceSummary />
            </div>
        </div>
    )
}

export default App;