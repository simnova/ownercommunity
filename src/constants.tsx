
export const LocalSettingsKeys = {
    SidebarCollapsed : 'sidebar-collapsed',
}  

export const handleToggler = (isExpanded : boolean, callback : (isExpanded : boolean) => void ) => {
    if (isExpanded) {
      callback(false);
      localStorage.setItem(LocalSettingsKeys.SidebarCollapsed, 'true');
      return;
    }
    callback(true);
    localStorage.removeItem(LocalSettingsKeys.SidebarCollapsed);
  };