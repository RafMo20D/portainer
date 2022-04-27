import { SidebarItem as MainComponent } from './SidebarItem';
import { Icon } from './Icon';
import { SidebarLink } from './Link';
import { Menu } from './Menu';
import { Wrapper } from './Wrapper';

interface SubComponents {
  Icon: typeof Icon;
  Link: typeof SidebarLink;
  Menu: typeof Menu;
  Wrapper: typeof Wrapper;
}

export const SidebarItem: typeof MainComponent & SubComponents =
  MainComponent as typeof MainComponent & SubComponents;

SidebarItem.Link = SidebarLink;
SidebarItem.Icon = Icon;
SidebarItem.Menu = Menu;
SidebarItem.Wrapper = Wrapper;
