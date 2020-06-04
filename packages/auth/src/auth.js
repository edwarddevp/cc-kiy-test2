import React, { Component } from 'react';
import nextCookie from 'next-cookies';
import redirectTo from "@codecraft/redirectto";

const auth = ctx => {
  const { dotribe__authtoken } = nextCookie(ctx);
  if (ctx.req && !dotribe__authtoken) {
    redirectTo(`${process.env.NEXT_PUBLIC_LOGIN_HOST}`, { res: ctx.res }); // status: 301
    ctx.res.end();
    return
  }
  if (!dotribe__authtoken) {
    redirectTo(`${process.env.NEXT_PUBLIC_LOGIN_HOST}`, { res: ctx.res }); // status: 301
  }
  return dotribe__authtoken;
};

export default auth;

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
    static async getInitialProps(ctx) {
      const token = auth(ctx);
      // let session;
      // try {
      //   session = await OAuthApi.call('/session');
      // } catch (e) {
      //   redirectTo(`${process.env.NEXT_PUBLIC_LOGIN_HOST}`, { res: ctx.res }); // status: 301
      // }
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, ...{ token } };
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  };
