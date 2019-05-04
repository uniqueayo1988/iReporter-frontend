import React from 'react';
import PropTypes from 'prop-types';

const ReportStatus = (props) => {
  const {
    title, resolved, unresolvedDraft, underInvestigation, rejected
  } = props;
  return (
    <div>
      <h2 className="record-header">{title}</h2>
      <div>
        <div className="db-redFlag db-redFlag1">
          <p className="redFlag-para">
            <span className="para-nos rResolved">{resolved}</span>
            <br />
            Resolved
            <br />
            <span className="para-sub">Records</span>
          </p>
        </div>

        <div className="db-redFlag db-redFlag2">
          <p className="redFlag-para">
            <span className="para-nos rDraft">{unresolvedDraft}</span>
            <br />
            Unresolved
            <br />
            <span className="para-sub">Draft</span>
          </p>
        </div>

        <div className="db-redFlag db-redFlag3">
          <p className="redFlag-para">
            <span className="para-nos rUnderInvestigation">{underInvestigation}</span>
            <br />
            Unresolved
            <br />
            <span className="para-sub">Under Investigation</span>
          </p>
        </div>

        <div className="db-redFlag db-redFlag4">
          <p className="redFlag-para">
            <span className="para-nos rRejected">{rejected}</span>
            <br />
            Rejected
            <br />
            <span className="para-sub">Records</span>
          </p>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

ReportStatus.propTypes = {
  title: PropTypes.string.isRequired,
  resolved: PropTypes.number.isRequired,
  unresolvedDraft: PropTypes.number.isRequired,
  underInvestigation: PropTypes.number.isRequired,
  rejected: PropTypes.number.isRequired,
};

export default ReportStatus;
