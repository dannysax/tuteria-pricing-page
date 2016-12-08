import React from 'react';

const FourthSection = ({the_class, phone_number}) => (
    <div className={the_class}>
        <div style={{border: "1px solid #eeeeee"}} className="panel-body">
            <div className="risk-messagebox-pane row row-condensed">
                <div className="va-container va-container-h va-container-v">
                    <div className="col-sm-10">
                        <h4 className="risk-messagebox__title space-top-1">
                            Need Help or Have Questions?
                        </h4>
                       
                    </div >
                    <div className="va-middle col-sm-2">
                        <div className="img--air-defender-no-overlap text-right" />

                    </div >
                </div >
                <div className="col-sm-10 col-md-12 col-lg-12 risk-messagebox__content">
                     <hr />
                    <h3 style={{marginTop: 0}}>{`Call us on ${phone_number}`}</h3>
                </div >
            </div >
        </div >
    </div>
);

export default FourthSection;
