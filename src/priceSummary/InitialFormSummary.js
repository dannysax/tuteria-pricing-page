import React, { PropTypes } from 'react';

const InitialFormSummary = ({ display = false, subject, urgency }) => (
    <div style={{ paddingBottom: 0 }} className={`${display ? '' : 'hidden-xs'} panel-body`}>
        <ul className="fa-ul">
            <li className="font-head"><i
              className="fa-li glyphicon glyphicon-bookmark lightblue"
            />{subject}
            </li>
            <li className="margin-top-15"><i
              className="fa-li glyphicon glyphicon-calendar lightblue"
            ></i>{urgency}
            </li>
        </ul>
    </div>
);
InitialFormSummary.propTypes = {
  urgency: PropTypes.string,
  display: PropTypes.bool,
  subject: PropTypes.string,
};
export default InitialFormSummary;
