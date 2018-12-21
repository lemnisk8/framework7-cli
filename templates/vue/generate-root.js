const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');

module.exports = (options) => {
  const {
    template,
    pkg,
    name,
    type,
  } = options;

  // Panels
  const leftPanelPlain = indent(6, `
    <!-- Left panel with cover effect-->
    <f7-panel left cover theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>Left panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>
  `);

  const leftPanelWithView = indent(6, `
    <!-- Left panel with cover effect when hidden -->
    <f7-panel left cover theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block-title>Left View Navigation</f7-block-title>
          <f7-list>
            <f7-list-item link="/left-page-1/" title="Left Page 1"></f7-list-item>
            <f7-list-item link="/left-page-2/" title="Left Page 2"></f7-list-item>
          </f7-list>
          <f7-block-title>Control Main View</f7-block-title>
          <f7-list>
            <f7-list-item link="/about/" view=".view-main" panel-close title="About"></f7-list-item>
            <f7-list-item link="/form/" view=".view-main" panel-close title="Form"></f7-list-item>
            <f7-list-item link="#" view=".view-main" back panel-close title="Back in history"></f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>
  `);
  const leftPanel = template === 'split-view' ? leftPanelWithView : leftPanelPlain;
  const rightPanel = indent(6, `
    <!-- Right panel with reveal effect-->
    <f7-panel right reveal theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Right Panel"></f7-navbar>
          <f7-block>Right panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>
  `);

  // Views
  let views = '';
  if (template === 'single-view' || template === 'split-view') {
    views = indent(6, `
      <!-- Your main view, should have "view-main" class -->
      <f7-view main class="ios-edges" url="/"></f7-view>
    `);
  }
  if (template === 'tabs') {
    views = indent(6, `
      <!-- Views/Tabs container -->
      <f7-views tabs class="ios-edges">
        <!-- Tabbar for switching views-tabs -->
        <f7-toolbar tabbar labels bottom>
          <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:home_fil" icon-md="material:home" text="Home"></f7-link>
          <f7-link tab-link="#view-catalog" icon-ios="f7:list_fill" icon-md="material:view_list" text="Catalog"></f7-link>
          <f7-link tab-link="#view-settings" icon-ios="f7:settings_fill" icon-md="material:settings" text="Settings"></f7-link>
        </f7-toolbar>

        <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
        <f7-view id="view-home" main tab tab-active url="/"></f7-view>

        <!-- Catalog View -->
        <f7-view id="view-catalog" name="catalog" tab url="/catalog/"></f7-view>

        <!-- Settings View -->
        <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>

      </f7-views>
    `);
  }

  return indent(0, `
    <template>
    <f7-app :params="f7params">
      <!-- Status bar overlay for fullscreen mode-->
      <f7-statusbar></f7-statusbar>
      ${leftPanel}
      ${rightPanel}
      ${views}

      <!-- Popup -->
      <f7-popup id="my-popup">
        <f7-view>
          <f7-page>
            <f7-navbar title="Popup">
              <f7-nav-right>
                <f7-link popup-close>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <p>Popup content goes here.</p>
            </f7-block>
          </f7-page>
        </f7-view>
      </f7-popup>

      <f7-login-screen id="my-login-screen">
        <f7-view>
          <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
              <f7-list-input
                type="text"
                name="username"
                placeholder="Your username"
                :value="username"
                @input="username = $event.target.value"
              ></f7-list-input>
              <f7-list-input
                type="password"
                name="password"
                placeholder="Your password"
                :value="password"
                @input="password = $event.target.value"
              ></f7-list-input>
            </f7-list>
            <f7-list>
              <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
              <f7-block-footer>
                Some text about login information.<br>Click "Sign In" to close Login Screen
              </f7-block-footer>
            </f7-list>
          </f7-page>
        </f7-view>
      </f7-login-screen>
    </f7-app>
    </template>
    <script>
      ${templateIf(type.indexOf('cordova') >= 0, () => `
      import cordovaApp from '../js/cordova-app.js';
      `)}
      import routes from '../js/routes.js';

      export default {
        data() {
          return {
            // Framework7 Parameters
            f7params: {
              ${templateIf(pkg, () => `
              id: '${pkg}', // App bundle ID{{/if}}
              `)}
              name: '${name}', // App name
              theme: 'auto', // Automatic theme detection
              // App routes
              routes: routes,
              ${templateIf(template === 'split-view', () => `
              // Enable panel left visibility breakpoint
              panel: {
                leftBreakpoint: 960,
              },
              `)}
              ${templateIf(template === 'tabs', () => `
              // App root data
              data() {
                return {
                  // Demo products for Catalog section
                  products: [
                    {
                      id: '1',
                      title: 'Apple iPhone 8',
                      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                    },
                    {
                      id: '2',
                      title: 'Apple iPhone 8 Plus',
                      description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                    },
                    {
                      id: '3',
                      title: 'Apple iPhone X',
                      description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                    },
                  ]
                }
              }
              `)}
            },
            // Login screen data
            username: '',
            password: '',
          }
        },
        methods: {
          alertLoginData() {
            this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
          }
        },
        ${templateIf(type.indexOf('cordova') >= 0, () => `
        mounted() {
          this.$f7ready(() => {
            // Init cordova APIs (see cordova-app.js)
            cordovaApp.init();
          });
        },
        `)}
      }
    </script>
  `).trim();
};
