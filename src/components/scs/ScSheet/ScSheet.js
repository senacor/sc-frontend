import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { savePerformanceData } from '../../../calls/sc';
import Performance from './categories/Performance';
import Skills from './categories/Skills';
import ButtonsBelowSheet from './ButtonsBelowSheet';

const styles = theme => ({
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  formControl: {
    minWidth: 180
  },
  dropdownContainer: {
    textAlign: 'center'
  }
});

const ScSheet = ({ sc, classes, intl }) => {
  const initialFieldsData = {
    title: '',
    weight: '',
    percentage: 0,
    evaluation: '',
    description: '',
    achievement: '',
    comment: ''
  };

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();
  const [position, setPosition] = useState('');
  const [dailyBusinessFields, setDailyBusinessFields] = useState(
    sc.employeePerformance.dailyBusiness
  );
  const [projectFields, setProjectFields] = useState(
    sc.employeePerformance.project
  );
  const [skillsInTheFieldFields, setSkillsInTheFieldFields] = useState([{
    title: "",
    weight: "",
    percentage: "",
    evaluation: "",
    description: "",
    achievement: "",
    comment: ""
  }]);
  const [impactOnTeamFields, setImpactOnTeamFields] = useState([{
    title: "",
    weight: "",
    percentage: "",
    evaluation: "",
    description: "",
    achievement: "",
    comment: ""
  }]);
  const [serviceQualityFields, setServiceQualityFields] = useState([{
    title: "",
    weight: "",
    percentage: "",
    evaluation: "",
    description: "",
    achievement: "",
    comment: ""
  }]);
  const [impactOnCompanyFields, setImpactOnCompanyFields] = useState([{
    title: "",
    weight: "",
    percentage: "",
    evaluation: "",
    description: "",
    achievement: "",
    comment: ""
  }]);

  const mockPositions = [
    'Specialist',
    'Senior (Expert)',
    'Senior (Mgmt.)',
    'Expert',
    'Manager'
  ];

  const handleSubmit = () => {
    // TODO: submitting data and sending to backend
  };

  const handleSave = () => {
    const data = {
      dailyBusiness: dailyBusinessFields.map(field => {
        return {
          title: field.title,
          evaluation: field.evaluation ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: field.weight,
          comment: field.comment
        };
      }),
      project: projectFields.map(field => {
        return {
          title: field.title,
          evaluation: field.evaluation ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: field.weight,
          comment: field.comment
        };
      })
    };
    savePerformanceData(
      sc.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      data,
      info,
      error
    );
  };

  const addSubcategory = type => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values.push(initialFieldsData);
      setDailyBusinessFields(values);
    } else {
      const values = [...projectFields];
      values.push(initialFieldsData);
      setProjectFields(values);
    }
  };

  const removeSubcategory = (type, index) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values.splice(index, 1);
      setDailyBusinessFields(values);
    } else {
      const values = [...projectFields];
      values.splice(index, 1);
      setProjectFields(values);
    }
  };

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

  const handleChangePerformance = (type, i, propKey, event) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values[i][propKey] = event.target.value;
      setDailyBusinessFields(values);
    } else if (type === 'project') {
      const values = [...projectFields];
      values[i][propKey] = event.target.value;
      setProjectFields(values);
    }
  };

  const handleChangeSkills = (type, i, propKey, event) => {
    if (type === 'skillsInTheField') {
      const values = [...skillsInTheFieldFields];
      values[i][propKey] = event.target.value;
      setSkillsInTheFieldFields(values);
    } else if (type === 'impactOnTeam') {
      const values = [...impactOnTeamFields];
      values[i][propKey] = event.target.value;
      setImpactOnTeamFields(values);
    } else if (type === 'serviceQuality') {
      const values = [...serviceQualityFields];
      values[i][propKey] = event.target.value;
      setServiceQualityFields(values);
    } else {
      const values = [...impactOnCompanyFields];
      values[i][propKey] = event.target.value;
      setImpactOnCompanyFields(values);
    }
    console.log('skills', skillsInTheFieldFields);
    console.log('impT', impactOnTeamFields);
    console.log('serv', serviceQualityFields);
    console.log('impC', impactOnCompanyFields);
  };

  return (
    <Fragment>
      <div className={classes.dropdownContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {intl.formatMessage({ id: 'scsheet.position' })}
          </InputLabel>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={position}
            onChange={handleChangePosition}
          >
            {mockPositions.map((pos, index) => (
              <MenuItem key={index} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* CATEGORIES */}
      <Fragment>
        <Performance
          dailyBusinessFields={dailyBusinessFields}
          projectFields={projectFields}
          handleChangePerformance={handleChangePerformance}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
        />
        <Skills
          skillsInTheFieldsFields={skillsInTheFieldFields}
          impactOnTeamFields={impactOnTeamFields}
          serviceQualityFields={serviceQualityFields}
          impactOnCompanyFields={impactOnCompanyFields}
          handleChangeSkills={handleChangeSkills}
        />
      </Fragment>
      <ButtonsBelowSheet
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        sc={sc}
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScSheet)));
