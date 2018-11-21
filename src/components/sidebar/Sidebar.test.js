import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { StyledComponent } from './Sidebar';
import ROLES from '../../helper/roles';
import FILTER_GROUPS from '../humanResources/filterGroups';

describe('Sidebar', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let getReviewerInfoMock = jest.fn();
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        userroles={['PR_MITARBEITER']}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        getReviewerInfo={getReviewerInfoMock}
      />
    );

    expect(element).toMatchSnapshot();
  });

  it('should contain composition number', () => {
    let getReviewerInfoMock = jest.fn();
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={['PR_MITARBEITER']}
        getReviewerInfo={getReviewerInfoMock}
      />
    );

    expect(element.find('WithStyles(CompositionNumber)')).toHaveLength(1);
  });

  it('should not show "PR Übersicht" to Employee', () => {
    let getReviewerInfoMock = jest.fn();
    let resetFilterGroupMock = jest.fn();

    const element = shallow(
      <StyledComponent
        userinfo={{
          givenName: 'Maria',
          surname: 'Mueller',
          numberOfPrsToReview: 0,
          numberOfPrsToSupervise: 0
        }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={[ROLES.PR_MITARBEITER]}
        getReviewerInfo={getReviewerInfoMock}
        resetFilterGroup={resetFilterGroupMock}
      />
    );

    expect(element.find('WithStyles(ListItem)[to="/prs"]')).toHaveLength(0);
  });

  it('should clear the filter REVIEWER by click on "PR Übersicht"', () => {
    let getReviewerInfoMock = jest.fn();
    let resetFilterGroupMock = jest.fn();

    const element = shallow(
      <StyledComponent
        userinfo={{
          givenName: 'Maria',
          surname: 'Mueller',
          numberOfPrsToReview: 1,
          numberOfPrsToSupervise: 0
        }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={[ROLES.PR_MITARBEITER]}
        getReviewerInfo={getReviewerInfoMock}
        resetFilterGroup={resetFilterGroupMock}
      />
    );

    element.find('WithStyles(ListItem)[to="/prs"]').simulate('click');
    expect(resetFilterGroupMock).toHaveBeenCalledTimes(1);
    expect(resetFilterGroupMock).toHaveBeenCalledWith(FILTER_GROUPS.REVIEWER);
  });

  it('should clear the filter EMPLOYEE by click on "Eigene PRs"', () => {
    let getReviewerInfoMock = jest.fn();
    let resetFilterGroupMock = jest.fn();

    const element = shallow(
      <StyledComponent
        userinfo={{
          givenName: 'Maria',
          surname: 'Mueller',
          numberOfPrsToReview: 0,
          numberOfPrsToSupervise: 0
        }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={[ROLES.PR_MITARBEITER]}
        getReviewerInfo={getReviewerInfoMock}
        resetFilterGroup={resetFilterGroupMock}
      />
    );

    element.find('WithStyles(ListItem)[to="/myPrs"]').simulate('click');
    expect(resetFilterGroupMock).toHaveBeenCalledTimes(1);
    expect(resetFilterGroupMock).toHaveBeenCalledWith(FILTER_GROUPS.EMPLOYEE);
  });

  it('should clear the filter HR by click on "Alle PRs"', () => {
    let getReviewerInfoMock = jest.fn();
    let resetFilterGroupMock = jest.fn();

    const element = shallow(
      <StyledComponent
        userinfo={{
          givenName: 'Maria',
          surname: 'Mueller',
          numberOfPrsToReview: 0,
          numberOfPrsToSupervise: 0
        }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={[ROLES.PR_HR]}
        getReviewerInfo={getReviewerInfoMock}
        resetFilterGroup={resetFilterGroupMock}
      />
    );

    element.find('WithStyles(ListItem)[to="/myPrs"]').simulate('click');
    expect(resetFilterGroupMock).toHaveBeenCalledTimes(1);
    expect(resetFilterGroupMock).toHaveBeenCalledWith(FILTER_GROUPS.EMPLOYEE);
  });
});
