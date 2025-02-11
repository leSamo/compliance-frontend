import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup } from '@patternfly/react-core';
import { ReduxFormTextInput } from 'PresentationalComponents/ReduxFormWrappers/ReduxFormWrappers';
import propTypes from 'prop-types';
import { thresholdValid } from '../../SmartComponents/CreatePolicy/validate';
import {
  PolicyThresholdTooltip,
  ComplianceThresholdHelperText,
} from 'PresentationalComponents';

export class ProfileThresholdField extends React.Component {
  state = {
    validThreshold: thresholdValid(this.props.previousThreshold),
    threshold: this.props.previousThreshold,
  };

  handleThresholdChange = (threshold) => {
    this.setState({
      validThreshold: thresholdValid(threshold),
      threshold: threshold,
    });
  };

  render() {
    const { threshold, validThreshold } = this.state;

    return (
      <React.Fragment>
        <FormGroup
          fieldId="policy-threshold"
          validated={validThreshold ? 'default' : 'error'}
          helperTextInvalid={
            <ComplianceThresholdHelperText threshold={threshold} />
          }
          helperText="A value of 95% or higher is recommended"
          labelIcon={<PolicyThresholdTooltip />}
          label="Compliance threshold (%)"
        >
          <Field
            name="complianceThreshold"
            id="complianceThreshold"
            isRequired={true}
            onChange={this.handleThresholdChange}
            validated={validThreshold ? 'default' : 'error'}
            defaultValue={threshold}
            aria-label="compliance threshold"
            component={ReduxFormTextInput}
            type="number"
            style={{ width: '60%', display: 'block' }}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

ProfileThresholdField.propTypes = {
  previousThreshold: propTypes.number,
};

export default reduxForm({
  form: 'policyForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ProfileThresholdField);
