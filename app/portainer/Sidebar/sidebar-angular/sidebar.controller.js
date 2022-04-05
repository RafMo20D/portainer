/* @ngInject */
export default function SidebarController($transitions, StateManager, EndpointProvider) {
  this.$onInit = $onInit.bind(this);
  this.reloadEndpointData = reloadEndpointData.bind(this);

  $transitions.onEnter({}, () => {
    this.reloadEndpointData();
  });

  async function $onInit() {
    this.reloadEndpointData();
  }

  function reloadEndpointData() {
    const endpoint = EndpointProvider.currentEndpoint();
    this.endpoint = endpoint;
    this.endpointId = endpoint && endpoint.Id;
    this.endpointState = StateManager.getState().endpoint;
  }
}
