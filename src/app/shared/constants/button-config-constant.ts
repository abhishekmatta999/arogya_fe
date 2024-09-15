export interface BUTTONUIMODEL{
  text?:string,
  cls?:string,
  icon?:string,
  imageCls?:string,
  tip?:string
}

export const LOGIN_BUTTON_CONFIG:BUTTONUIMODEL = {
  text: "loginButtonText",
  cls: 'login-button-orange'
};

export const SEND_PASSWORD_BUTTON_CONFIG:BUTTONUIMODEL = {
  cls: 'login-button-orange',
  text: 'sendPasswordText'
}

export const LOGIN_ON_RESET_PAGE_BUTTON_CONFIG:BUTTONUIMODEL = {
  cls: 'login-button-without-border',
  text: 'loginButtonText'
}

export const RESET_BUTTON_CONFIG:BUTTONUIMODEL = {
  icon:'../../assets/images/filter.svg',
  text:'Reset',
  imageCls:'reset_img'
} 

export const GO_TO_HOME_CONFIG = {
  text:'Back to Home',
  cls:'btn btn-success'
}

export const SUBSCRIPTION_BUTTON_CONFIG = {
  text:'subscriptionText',
  cls: 'transparent-background-orange-button'
}
