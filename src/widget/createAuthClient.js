import { OktaAuth } from '@okta/okta-auth-js';
import Util from 'util/Util';
import config from 'config/config.json';
import _ from 'underscore';
import { removeNils } from '@okta/okta-auth-js/cjs/util'; // OKTA-325445

export default function (options) {
  var authParams = _.extend({
    transformErrorXHR: Util.transformErrorXHR,
    headers: {
      'X-Okta-User-Agent-Extended': 'okta-signin-widget-' + config.version
    },
  }, options);

  // Disable token manager auto renew
  authParams.tokenManager = _.extend({}, authParams.tokenManager, {
    autoRenew: false
  });

  // OKTA-325445
  authParams.headers = removeNils(authParams.headers);
  
  return new OktaAuth(authParams);
}
