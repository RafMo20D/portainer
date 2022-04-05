import angular from 'angular';

import { sidebarWrapper } from './sidebar-angular';
import { SidebarAngular } from './Sidebar';
import { AngularSidebarService } from './useSidebarState';

export const sidebarModule = angular
  .module('portainer.app.sidebar', [])
  .component('sidebar', sidebarWrapper)
  .component('sidebarReact', SidebarAngular)
  .factory('SidebarService', AngularSidebarService).name;
