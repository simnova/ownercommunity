
export const LocalSettingsKeys = {
    SidebarCollapsed : 'sidebar-collapsed',
    UserId: 'userId'
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