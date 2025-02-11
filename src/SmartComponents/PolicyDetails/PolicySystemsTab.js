/* eslint-disable react/display-name */
import React from 'react';
import propTypes from 'prop-types';
import { NoSystemsTableWithWarning } from 'PresentationalComponents';
import { SystemsTable } from 'SmartComponents';
import { GET_SYSTEMS } from '../SystemsTable/constants';
import * as Columns from '../SystemsTable/Columns';

const PolicySystemsTab = ({ policy }) => (
  <SystemsTable
    columns={[
      Columns.customName({
        showLink: true,
      }),
      Columns.inventoryColumn('tags'),
      Columns.OS,
      Columns.SsgVersion,
    ]}
    showOsMinorVersionFilter={[policy.majorOsVersion]}
    query={GET_SYSTEMS}
    policyId={policy.id}
    defaultFilter={`policy_id = ${policy.id}`}
    showActions={false}
    remediationsEnabled={false}
    noSystemsTable={
      policy?.hosts?.length === 0 && <NoSystemsTableWithWarning />
    }
    complianceThreshold={policy.complianceThreshold}
  />
);

PolicySystemsTab.propTypes = {
  policy: propTypes.shape({
    id: propTypes.string.isRequired,
    complianceThreshold: propTypes.number.isRequired,
    majorOsVersion: propTypes.string.isRequired,
    hosts: propTypes.array.isRequired,
  }),
  systemTableProps: propTypes.object,
};

export default PolicySystemsTab;
