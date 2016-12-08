import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {range} from 'lodash';


const fourthStyle = StyleSheet.create({
  host: {
    color: '#757575',
    fontSize: '16px',
    marginBottom: '12px',
  },
  heading: {
    fontSize: '19px',
    lineHeight: '25px',
  },
  muted: {
    color: '#757575',
    fontSize: '16px',
    // borderBottom: "1px solid gray",
  },
});

export const TutorSummary = ({ first_name, location, heading, reviews, rating_decimal }) => (
        <div className="panel-body">
            <div className={css(fourthStyle.host) }>
                <span>{first_name}</span>
            </div>
            <div className={`font-head ${css(fourthStyle.heading)} `}>
                {heading}</div>             
            <hr className="hidden-xs" style={{marginBottom: 0}} />
        </div>
    );

TutorSummary.propTypes = {
  location: PropTypes.string,
  heading: PropTypes.string,
  rating_decimal: PropTypes.bool,
  reviews: PropTypes.arrayOf(PropTypes.number),
  first_name: PropTypes.string,
};
export default TutorSummary
;
