import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { validEmailRegex } from './../../../../utils/index';
import { FormattedMessage } from 'react-intl';
import { IGenderParams, ILocationParams, ISignUpParams, IStateParams } from '../../../../models/auth';
import { NavLink } from 'react-router-dom'
import { ROUTES } from './../../../../configs/routes'
import './style.scss';

interface Props {
  loading: boolean;
  errorMessage: string;
  locations: ILocationParams[];
  genders: IGenderParams[];
  states: IStateParams[];
  onSignUp(values: ISignUpParams): void;
  handleChangeLocation(values: string): void;
}

function SignUpForm(props: Props) {
  const { errorMessage, loading, locations, genders, states, onSignUp, handleChangeLocation } = props;
  const initialValues: ISignUpParams = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  };

  const changeLocation = (idLocation: string) => {
    handleChangeLocation(idLocation);
  };

  const validationSchema = yup.object({
    email: yup.string().required('emailRequire').matches(validEmailRegex, 'emailInvalid'),
    password: yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
    repeatPassword: yup
      .string()
      .required('repeatPasswordRequire')
      .oneOf([yup.ref('password'), null], 'repeatPasswordInvalid'),
    name: yup.string().required('nameRequire'),
    gender: yup.string().required('genderRequire'),
    region: yup.string().required('regionRequire'),
    state: yup.string().required('stateRequire'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          onSignUp(data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched }) => (
          <>
            {changeLocation(values.region)}
            <form className="inforForm">
              <div className="col-md-12">
                <label htmlFor="inputEmail" className="form-label">
                  <FormattedMessage id="email" />
                </label>
                <input type="text" className="form-control" id="inputEmail" placeholder="Enter your email" />
                {errors && errors?.email && touched?.email && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.email} />
                  </small>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="inputPassword" className="form-label">
                  <FormattedMessage id="password" />
                </label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Enter your password" />
                {errors && errors?.password && touched?.password && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.password} />
                  </small>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="inputRepeatPassword" className="form-label">
                  <FormattedMessage id="repeatPassword" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputRepeatPassword"
                  placeholder="Enter your repeat password"
                />
                {errors && errors?.repeatPassword && touched?.repeatPassword && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.repeatPassword} />
                  </small>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="inputName" className="form-label">
                  <FormattedMessage id="name" />
                </label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter your name" />
                {errors && errors?.name && touched?.name && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.name} />
                  </small>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="selectGender" className="form-label">
                  <FormattedMessage id="gender" />
                </label>
                <select className="form-control" id="selectGender">
                  <option>-----Chọn giới tính-----</option>
                  {genders &&
                    genders.length > 0 &&
                    genders.map((genders, id) => {
                      <option key={id} value={genders.value}>
                        {genders.label}
                      </option>;
                    })}
                </select>
                {errors && errors?.gender && touched?.gender && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.gender} />
                  </small>
                )}
              </div>

              <div className="col-md-12">
                <label htmlFor="selectRegion" className="form-label">
                  <FormattedMessage id="region" />
                </label>
                <select className="form-control" id="selectRegion">
                  <option>-----Chọn quốc gia-----</option>
                  {locations && locations.length> 0 && locations.map((location) => {
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  })}
                </select>
              </div>

              <div className="col-md-12">
                <label htmlFor="selectRegion" className="form-label">
                  <FormattedMessage id="state" />
                </label>
                <select className="form-control" id="selectRegion">
                  <option>-----Chọn thành phố-----</option>
                  {states && states.length> 0 && states.map((state) => {
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  })}
                </select>
                {errors && errors?.state && touched?.state && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.state} />
                  </small>
                )}
              </div>


              <NavLink className="link-sign-in" to={ROUTES.login}>
                
              </NavLink>
              <div className="justify-content-md-center" style={{ display: 'flex', margin: '16px 0' }}>
                <div className="col-md-auto">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                    <FormattedMessage id="register" />
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </Formik>
    </>
  );
}

export default SignUpForm;
