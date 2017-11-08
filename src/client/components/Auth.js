import React from 'react';
import { Link } from 'react-router-dom';
import { concat } from '../util';
import { FormattedMessage } from 'react-intl';
import Brand from './Brand';
import Button from './Button';
import FormField from './FormField';
import emailSvg from '../images/email.svg';
import lockSvg from '../images/lock.svg';

import style from './Auth.less';
import grid from '../grid.less';
import theme from '../theme.css';

function submitLogin(e, onLogin) {
  e.preventDefault();
  const { email, password } = e.target;
  email.value && password.value && onLogin(email.value, password.value);
}

const LoginForm = ({ onLogin }) => (
  <form onSubmit={e => submitLogin(e, onLogin)}>
    <FormField icon={emailSvg} name="email" title={<FormattedMessage
        id="user.email"
        defaultMessage="Email Address" />} />
    <FormField password={true} icon={lockSvg} name="password" title={<FormattedMessage
        id="user.password"
        defaultMessage="Password" />} />
    <div className={concat(theme.txt_2, style.forgot)}>
      <FormattedMessage id="login.forgot" defaultMessage="Forgot your password?" />
    </div>
    <Button type="submit"
            border={true}
            className={concat(style.button, theme.txt_darkest)}
            text={<FormattedMessage id="login.signin" defaultMessage="Sign In" />} />
  </form>
);

const SignupForm = () => (
  <form>
    <FormField name="firstname" title={<FormattedMessage
        id="user.firstname"
        defaultMessage="First Name" />} />
    <FormField name="lastname" title={<FormattedMessage
        id="user.lastname"
        defaultMessage="Last Name" />} />
    <FormField icon={emailSvg} name="email" title={<FormattedMessage
        id="user.email"
        defaultMessage="Email Address" />} />
    <FormField password={true} icon={lockSvg} name="password" title={<FormattedMessage
        id="user.password"
        defaultMessage="Password" />} />
    <FormField password={true} icon={lockSvg} name="repeatpassword" title={<FormattedMessage
        id="user.repeatpassword"
        defaultMessage="Repeat Password" />} />
  </form>
);

const tabs = {
  login: {
    url: 'login',
    text: <FormattedMessage id="auth.signin" defaultMessage="Sign In" />,
    form: LoginForm
  },
  signup: {
    url: 'signup',
    text: <FormattedMessage id="auth.signup" defaultMessage="Sign Up" />,
    form: SignupForm
  }
};

class Auth extends React.Component {

  componentWillMount() {
    // reset login status
    this.props.onLogout();
  }

  render() {
    const { match, onLogin } = this.props;

    return (
        <div className={concat(grid.row, grid.gutterless, style.wrap)}>
          <div className={concat(style.content, grid.col_sm_12, grid.col_md_5)}>
            <div className={concat(style.head, theme.txt_lightest, theme.bg_2)}>
              <Brand size={14} />
            </div>
            <div className={concat(style.form, theme.bg_content)}>
              <nav className={style.nav}>
                {Object.keys(tabs).map(tabId => {
                  const tab = tabs[tabId];
                  const selected = match.params.selectedTab === tab.url;
                  return (
                      <Link key={tabId} className={concat(style.link, selected ? style.selected : null)}
                            to={match.path.replace(':selectedTab', tab.url)}>{tab.text}
                        {selected ? <div className={concat(style.selector, theme.bg_3)}></div> : null}
                      </Link>
                  );})}
              </nav>
              <section className={concat(style.intro, theme.txt_dark)}>
                <FormattedMessage
                    id="login.intro"
                    defaultMessage="Welcome to Nyan, an event management tool. This platform has been built by and made for the regional Burning Man community and their events."
                />
              </section>
              <section className={style.temp}>
                The login is butts@butts.com : buttsRgr8
              </section>
              {(() => {
                const Form = tabs[match.params.selectedTab].form;
                return <Form onLogin={onLogin} />;
              })()}
            </div>
          </div>
          <div className={concat(style.photo, grid.col_sm_0, grid.col_md_7)}
               style={{ backgroundImage: 'url(/hrpdrp.png' }}
          ></div>
        </div>
    );
  }
}

export default Auth;