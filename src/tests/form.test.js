/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import moxios from 'moxios';
// import axios from 'axios';
import { shallow } from 'enzyme';

import Form from '../components/form';
import '../enzymeConfig';

const shallowSetup = () => {
  const props = {
    onSubmit: jest.fn(),
    stateChange: jest.fn(),
    onChange: jest.fn(),
    isSubmitted: jest.fn(),
    errors: {
      email: 'enter a valid email',
      error: 'both email and username are in use',
    },
    data: {
      firstname: 'user',
      lastname: 'userLastname',
      username: 'username',
      email: 'example@email.com',
      password: 'Google16!',
    },
  };
  const form = shallow(<Form {...props} />);
  return { form, props };
};

describe('<Form/>', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should render <Form/> without crashing', () => {
    const { form } = shallowSetup();
    expect(form).toMatchSnapshot();
  });

  it('should not post new user info if some inputs are not valid', () => {
    const { form, props } = shallowSetup();
    props.data.firstname = 'u';

    form
      .find('.signup_form_style')
      .at(0)
      .simulate('submit', { preventDefault: jest.fn() });
    expect(props.isSubmitted).not.toHaveBeenCalled();
  });

  it('should post new user info', () => {
    const { form, props } = shallowSetup();
    moxios.stubRequest(`${process.env.REACT_APP_BACKEND}auth/signup`, {
      status: 201,
      response: {
        user: {
          username: '',
          email: '',
          bio: '',
          image: '',
          token: '',
        },
      },
    });

    form
      .find('.signup_form_style')
      .at(0)
      .simulate('submit', { preventDefault: jest.fn() });
    expect(props.stateChange).toHaveBeenCalledTimes(1);

    // to be continued...
  });

  it('should return  error when email is taken ', () => {
    const { form, props } = shallowSetup();
    moxios.stubRequest(`${process.env.REACT_APP_BACKEND}auth/signup`, {
      status: 400,
      response: {
        error: 'email is not available',
      },
    });

    form
      .find('.signup_form_style')
      .at(0)
      .simulate('submit', { preventDefault: jest.fn() });
    expect(props.stateChange).toHaveBeenCalledTimes(1);
  });

  it('should return  error when username is taken ', () => {
    const { form, props } = shallowSetup();
    moxios.stubRequest(`${process.env.REACT_APP_BACKEND}auth/signup`, {
      status: 400,
      response: {
        error: 'username is not available',
      },
    });

    form
      .find('.signup_form_style')
      .at(0)
      .simulate('submit', { preventDefault: jest.fn() });
    expect(props.stateChange).toHaveBeenCalledTimes(1);
  });

  it('should return  error when network has some issue ', () => {
    const { form, props } = shallowSetup();
    moxios.stubRequest(`${process.env.REACT_APP_BACKEND}auth/signup`, {
      status: 400,
      response: {
        error: 'unable to connect to the server.',
      },
    });

    form
      .find('.signup_form_style')
      .at(0)
      .simulate('submit', { preventDefault: jest.fn() });
    expect(props.stateChange).toHaveBeenCalledTimes(1);
  });

  describe('Test FormFunctions ', () => {
    it('should update state when when user type-in the input field with all validation passing', () => {
      const { form, props } = shallowSetup();
      form
        .instance()
        .handleChange({ currentTarget: { name: 'firstname', value: 'klr' } });
      expect(props.stateChange).toHaveBeenCalledTimes(1);
    });

    it('should update state when when user type-in the input field without any validation passing', () => {
      const { form, props } = shallowSetup();
      form
        .instance()
        .handleChange({ currentTarget: { name: 'firstname', value: 'k' } });
      expect(props.stateChange).toHaveBeenCalledTimes(1);
    });
  });
});
